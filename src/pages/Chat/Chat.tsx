import React, { useState, useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { useLocation } from 'react-router-dom';
import downimg from '../../assets/Downimg.svg';
import useProjectStore from '../../state/IDE/ProjectState';

import { ThemeProvider } from 'styled-components';
import profileOther from '../../assets/profileOther.svg';
import profileMine from '../../assets/profileMine.svg';
import Chatsend from '../../assets/chatsend.svg';
import Chatsearch from '../../assets/chatsearch.svg';
import messageTrash from '../../assets/messageTrash.svg';
import pointerup from '../../assets/pointerup.svg';
import searchDown from '../../assets/searchDown.svg';
import { useTheTheme } from '../../components/Theme';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ReactComponent as ChatLightIcon } from '../../assets/chatlight.svg';
import { ReactComponent as FolderLightIcon } from '../../assets/folderlight.svg';
import { ReactComponent as FolderDarkIcon } from '../../assets/folderdark.svg';
import { ReactComponent as ChatDarkIcon } from '../../assets/chatdark.svg';
import useChatStore, { Message } from '../../state/Chat/ChatStore';
import useAuthStore from '../../state/AuthStore';
import { formatKoreanTime } from '../../components/Timestamp';
import {
  lightTheme,
  SearchUp,
  SearchDown,
  darkTheme,
  Container,
  MessageContainer,
  MessageFlexContainer,
  UserContainer,
  DownButton,
  MyUserContainer,
  MessageOther,
  UserIcon,
  UserName,
  MessageMine,
  MessageOthertext,
  MessageMinetext,
  ChatContainer,
  Downimg,
  ChatInputContainer,
  MyMessageTrash,
  ChatInput,
  SendButton,
  SearchButton,
  SearchInput,
  StyledDiv,
  Pointerimg,
  Timestampmine,
  Timestamp,
} from './ChatStyles';
import axios from 'axios';
import { AnyARecord } from 'dns';
import useConsoleStore from '../../state/IDE/ConsoleStore';
import { Loading } from '../../components/IDE/Loading';
import PjList from '../../components/\bPjList';

const userName = 'coco';
const userPassword = 'coco';
const Token = btoa(`${userName}:${userPassword}`);

const Chat = () => {
  const { messages, addMessage, deleteMessage, deleteAllMessages } = useChatStore();
  const [showPjList, setShowPjList] = useState(false);
  const [newMessage, setNewMessage] = useState<string>('');
  const { themeColor } = useTheTheme();
  const { memberId } = useAuthStore();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0); // 스크롤 위치 저장을 위한 ref
  const [messageCount, setMessageCount] = useState(messages.length); // 메시지 개수 상태 추가
  const messageRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const stompClient = useRef<Client | null>(null);
  // 검색 결과와 현재 선택된 인덱스 상태
  // 상태 변수 선언 부분
  const [searchResults, setSearchResults] = useState<Message[]>([]);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [lastSearchHadResults, setLastSearchHadResults] = useState(true);
  const { isLoading, setIsLoading } = useConsoleStore();

  //내 채팅 삭제하는 함수
  const handleDeleteMessage = async (messageId: any) => {
    if (window.confirm(`메세지를 삭제할건가요?`)) {
      saveScrollPosition();
      try {
        // 서버에 삭제 요청을 보냄
        await axios.delete(`http://43.201.76.117:8080/message?messageId=${messageId}`, {
          headers: { Authorization: `Basic ${Token}` },
        });
        // UI에서 메시지 삭제
        deleteMessage(messageId);
        console.log('Message deleted:', messageId);
        setTimeout(restoreScrollPosition, 0);
      } catch (error) {
        console.error('Failed to delete message:', messageId, error);
      }
      restoreScrollPosition(); // 삭제 후 스크롤 위치 복원
    }
  };

  useEffect(() => {
    // 비동기 작업을 실행하는 함수
    const connectStomp = async () => {
      setIsLoading(true);
      try {
        const socket = new SockJS('http://43.201.76.117:8080/ws');
        stompClient.current = new Client({
          webSocketFactory: () => socket,
          onConnect: () => {
            console.log('Connected', memberId);
            if (chatContainerRef.current) {
              const scrollPosition = chatContainerRef.current.scrollTop;
              deleteAllMessages(); // 이전 메시지 삭제
              chatContainerRef.current.scrollTop = scrollPosition;
            }
            loadInitialMessages(); // 초기 데이터 로드를 여기로 옮깁니다
            // 실시간 채팅 구독 설정 및 초기 메시지 불러오기
            // 먼저 기존 데이터를 불러옵니다
            // 실시간 메시지를 받기 위한 구독 설정
            stompClient.current?.subscribe('/topic/chat', message => {
              console.log('Received message:', message);
              const receivedMessage = JSON.parse(message.body);
              if (receivedMessage.message && receivedMessage.memberId && receivedMessage.nickname) {
                addMessage(receivedMessage);
                console.log('Message added:', receivedMessage);
              } else {
                console.error('Invalid message format:', receivedMessage);
              }
            });
            setIsLoading(false);
          },
          onStompError: frame => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
          },
        });
        stompClient.current.activate();
      } catch (error) {
        console.error('Connection error:', error);
      }
    };
    // 채팅 데이터를 불러오는 함수
    const loadInitialMessages = async () => {
      try {
        // 기존 채팅 데이터 요청 (토큰 없이)
        deleteAllMessages();
        const response = await axios.get(
          `http://43.201.76.117:8080/messages`,
          // 데이터를 성공적으로 받아왔다면 화면에 표시하는 로직
          { headers: { Authorization: `Basic ${Token}` } },
        );

        response.data.forEach((msg: any) => {
          addMessage(msg);
        });
        console.log('Get messages:', response.data);
      } catch (error) {
        console.error('Failed to load initial messages:', error);
      }
    };
    // 비동기 함수 호출
    connectStomp();

    // 클린업 함수에서는 비동기 로직을 포함하지 않고, 단지 필요한 자원 정리만 수행
    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
        console.log('Disconnected'); // 비동기 작업 없이 STOMP 클라이언트 비활성화
      }
    };
  }, [deleteAllMessages]); // 의존성 배열, 필요에 따라 변수 포함

  const currentTheme = themeColor === 'light' ? lightTheme : darkTheme;

  // 메시지 전송
  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      stompClient.current?.publish({
        destination: '/app/message',
        body: JSON.stringify({ memberId: memberId, message: newMessage, nickname: 'test' }),
      });
      setNewMessage('');
      console.log('send');
      const latestMessage = [...messages].reverse().find(msg => !msg.isDeleted);
      if (latestMessage && messageRefs.current[latestMessage.chatId]) {
        // 해당 메시지의 DOM 요소로 스크롤 이동
        const element = messageRefs.current[latestMessage.chatId];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  const toggleSearch = () => {
    console.log('Toggle Search:', !showSearch); // Debugging
    setShowSearch(!showSearch);
    // 검색창을 닫는 경우, 검색 결과와 입력된 검색어를 초기화
    if (showSearch) {
      setSearchResults([]);
      setSearchMessage('');
      setActiveIndex(-1); // 활성화된 인덱스를 초기화
    }

    console.log('Toggle Search:', !showSearch); // Debugging
  };

  // 다음 검색 결과로 이동
  const handleSearchDown = useCallback(() => {
    if (activeIndex > 0) {
      setActiveIndex(prevIndex => prevIndex - 1);
    } else {
      alert('더 이상의 검색 결과가 없습니다.');
    }
  }, [activeIndex]);

  // 이전 검색 결과로 이동
  const handleSearchUp = useCallback(() => {
    if (activeIndex < searchResults.length - 1) {
      setActiveIndex(prevIndex => prevIndex + 1);
    } else {
      alert('더 이상의 검색 결과가 없습니다.');
    }
  }, [activeIndex, searchResults.length]);

  // 메시지 검색 기능
  const handleSearch = useCallback(() => {
    const filtered = messages.filter(
      m => !m.isDeleted && m.message.toLowerCase().includes(searchMessage.toLowerCase()),
    );
    setSearchResults(filtered.reverse());
    if (filtered.length > 0) {
      setActiveIndex(0);
      if (!lastSearchHadResults) {
        setLastSearchHadResults(true);
      }
    } else {
      setActiveIndex(-1);
      // 검색 결과가 없고, 이전 검색에 결과가 있었을 경우에만 알림을 표시
      if (lastSearchHadResults) {
        alert('검색 결과가 없습니다.');
        setLastSearchHadResults(false);
      }
    }
  }, [messages, searchMessage]);

  useEffect(() => {
    if (searchResults.length > 0 && activeIndex !== -1) {
      const element = messageRefs.current[searchResults[activeIndex].chatId];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [searchResults, activeIndex]);

  // 입력 핸들러
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMessage(event.target.value);
  }, []);

  // 스크롤 위치를 저장하고 복원하는 함수
  const saveScrollPosition = () => {
    if (messagesEndRef.current) {
      lastScrollTop.current = messagesEndRef.current.scrollTop;
    }
  };

  const restoreScrollPosition = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = lastScrollTop.current;
    }
  };
  const scrollToBottom = () => {
    // 가장 최근의 isDeleted가 false인 메시지 찾기
    const latestMessage = [...messages].reverse().find(msg => !msg.isDeleted);

    if (latestMessage && messageRefs.current[latestMessage.chatId]) {
      // 해당 메시지의 DOM 요소로 스크롤 이동
      const element = messageRefs.current[latestMessage.chatId];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  };

  const togglePJList = () => {
    setShowPjList(!showPjList);
    console.log('Current showPjList before toggle:', showPjList);
  };
  useEffect(() => {
    console.log('모달 창 상태: ', showPjList);
  }, [showPjList]);
  return (
    <ThemeProvider theme={currentTheme}>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <StyledDiv>
            <IconButton onClick={togglePJList}>
              {themeColor === 'light' ? <FolderLightIcon /> : <FolderDarkIcon />}
            </IconButton>
            <IconButton>{themeColor === 'light' ? <ChatLightIcon /> : <ChatDarkIcon />}</IconButton>
          </StyledDiv>
          {showPjList && <PjList onClose={() => setShowPjList(false)} />}
          <MessageContainer ref={chatContainerRef}>
            <div style={{ flexGrow: 1, height: '100%', overflowY: 'scroll' }}>
              {messages
                .filter(msg => !msg.isDeleted)
                .map((msg, index) => (
                  <div
                    key={msg.chatId}
                    ref={el => (messageRefs.current[msg.chatId] = el)}
                    style={{
                      fontWeight: searchResults.includes(msg) ? 'bold' : 'normal',
                      textDecoration: searchResults.includes(msg) ? 'underline' : 'none',
                    }}
                  >
                    {msg.memberId == memberId ? (
                      <MessageMine>
                        <Timestampmine>
                          <div>{formatKoreanTime(msg.createdAt).date}</div>
                          <div>{formatKoreanTime(msg.createdAt).time}</div>
                        </Timestampmine>
                        <MessageMinetext>{msg.message}</MessageMinetext>
                        <MyMessageTrash onClick={() => handleDeleteMessage(msg.chatId)} src={messageTrash} />
                        <MyUserContainer>
                          <UserIcon src={profileMine} />
                        </MyUserContainer>
                      </MessageMine>
                    ) : (
                      <MessageFlexContainer>
                        <MessageOther>
                          <UserContainer>
                            <UserIcon src={profileOther} />
                            <UserName>{msg.nickname}</UserName>
                          </UserContainer>
                          <MessageOthertext>{msg.message}</MessageOthertext>
                          <Timestamp>
                            <div>{formatKoreanTime(msg.createdAt).date}</div>
                            <div>{formatKoreanTime(msg.createdAt).time}</div>
                          </Timestamp>
                        </MessageOther>
                      </MessageFlexContainer>
                    )}
                  </div>
                ))}
            </div>
            <DownButton onClick={scrollToBottom}>
              <Downimg src={downimg} />
            </DownButton>
          </MessageContainer>
          <ChatContainer>
            <ChatInputContainer>
              <ChatInput
                type="text"
                value={newMessage}
                onChange={(e: any) => setNewMessage(e.target.value)}
                placeholder="메시지를 입력하세요"
                onKeyPress={handleKeyPress}
              />
              <SendButton type="button" onClick={handleSendMessage}>
                <img src={Chatsend} />
              </SendButton>
            </ChatInputContainer>
          </ChatContainer>
          <SearchButton onClick={toggleSearch}>
            <img src={Chatsearch} />
          </SearchButton>
          {showSearch && (
            <div>
              <SearchInput
                show={showSearch}
                value={searchMessage}
                type="text"
                onChange={e => setSearchMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="검색"
              />
              <SearchDown onClick={handleSearchDown}>
                <Pointerimg src={searchDown} />
              </SearchDown>
              <SearchUp onClick={handleSearchUp}>
                <Pointerimg src={pointerup} />
              </SearchUp>
            </div>
          )}
        </Container>
      )}
    </ThemeProvider>
  );
};

export default Chat;
