'use client';

import Button from '@/components/button/Button';
import { Radio, Text } from '@/components/input/Input';
import { kakaoInit } from '@/util/kakaoinit';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

const Index = () => {
  const [tab, setTab] = useState(-1);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  type formType = {
    username?: string;
    password?: number;
  }

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<formType>({ mode: "onChange" });

  const kakaoLogin = async () => {
    // 카카오 초기화
    const kakao = kakaoInit();

    // 카카오 로그인 구현
    kakao.Auth.login({
      success: () => {
        kakao.API.request({
          url: '/v2/user/me', // 사용자 정보 가져오기
          success: (res: any) => {
            // 로그인 성공할 경우 정보 확인 후 /kakao 페이지로 push
            console.log(res);
            // Router.push('/kakao');
          },
          fail: (error: any) => {
            console.log(error);
          }
        })
      },
      fail: (error: any) => {
        console.log(error);
      }
    })
  }

  const KakaoLogout = () => {
    const kakao = kakaoInit();

    console.log(kakao.Auth.getAccessToken()); // 카카오 접근 토큰 확인 (로그인 후 해당 토큰을 이용하여 추가 기능 수행 가능)

    // 카카오 로그인 링크 해제
    kakao.API.request({
      url: '/v1/user/unlink',
      success: (res: any) => {
        // 로그인 성공할 경우 정보 확인 후 / 페이지로 push
        console.log(res);
        // Router.push('/');
      },
      fail: (error: any) => {
        console.log(error);
      }
    })
  }

  return (
    <div className='flex h-screen max-w-400 m-auto flex-col justify-center items-center'>
      <Button onClick={KakaoLogout}>로그아웃</Button>
      <div className='h-160 flex items-center flex-col'>
        <nav className='flex gap-8'>
          <Radio name="userType" id="구매자" label='구매자' />
          <Radio name="userType" id="등록자" label='등록자' />
        </nav>
        <nav className='flex gap-10 mt-10'>
          <Button onClick={kakaoLogin} className={classNames('bg-[#fae100] text-white', {})}>카카오 회원가입</Button>
          <Button theme='border' onClick={() => setTab(1)} className={classNames('border-primary', {
            'bg-primary text-white': tab === 1
          })}>일반 회원가입</Button>
          <Button theme='border' onClick={() => setTab(2)} className={classNames('border-primary', {
            'bg-primary text-white': tab === 2
          })}>비회원</Button>
        </nav>
        {(tab === 1 || tab === 2) &&
          <div className='mt-40'>
            <div>
              <div className='gap-6'>
                <label>이름</label>
                <input type="text"
                  id="username"
                  placeholder='이름을 입력해주세요'
                  maxLength={5}
                  {...register('username', {
                    required: "이름은 필수 입력입니다.",
                    minLength: {
                      value: 2,
                      message: "2자리 이상 입력해주세요.",
                    },
                  })}
                />
              </div>
              {errors.username && <small role="alert">{errors.username.message}</small>}
            </div>
            <div>
              <div className='gap-6'>
                <label>비밀번호</label>
                <input type="password"
                  id="password"
                  placeholder='비밀번호를 입력해주세요'
                  minLength={6}
                  {...register('password', {
                    required: "비밀번호는 필수 입력입니다.",
                    minLength: {
                      value: 6,
                      message: "6자리 이상 입력해주세요.",
                    },
                    pattern: {
                      value: /^[A-Za-z0-9]*$/,
                      message: "영어 또는 숫자만 입력해주세요",
                    },
                  })}
                />
              </div>
              {errors.password && <small role="alert">{errors.password.message}</small>}
            </div>
          </div>}
      </div>
    </div>
  )
}

export default Index;