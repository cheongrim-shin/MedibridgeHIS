<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>진단서발급 | MediBridge</title>
  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">
        <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
          진단서발급
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          진단서·소견서 및 제증명 발급 절차, 창구 위치, 구비 서류를 안내합니다.
        </p>

        <p class="mt-2 text-body-md text-ink-secondary">
          본인 외 가족 또는 대리인이 신청하는 경우에는 관계 확인 서류, 동의서, 위임장 등이 필요할 수 있습니다.
        </p>
      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <div class="space-y-gutter lg:col-span-2">

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                진단서·소견서 발급 절차
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <div class="grid grid-cols-1 gap-8 md:grid-cols-2">

                <article>
                  <h3 class="mb-4 font-title text-title text-ink-black">
                    외래환자인 경우
                  </h3>

                  <ol class="space-y-3">
                    <li class="flex gap-3 text-body-md text-ink-secondary">
                      <span class="flex h-7 w-7 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                        1
                      </span>
                      <span class="pt-0.5">
                        외래진료를 예약하여 진료 시 담당의사에게 진단서 발급을 요청합니다.
                      </span>
                    </li>

                    <li class="flex gap-3 text-body-md text-ink-secondary">
                      <span class="flex h-7 w-7 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                        2
                      </span>
                      <span class="pt-0.5">
                        진료 후 수납 시 진단서를 발급받습니다.
                      </span>
                    </li>
                  </ol>
                </article>

                <article>
                  <h3 class="mb-4 font-title text-title text-ink-black">
                    입원환자인 경우
                  </h3>

                  <ol class="space-y-3">
                    <li class="flex gap-3 text-body-md text-ink-secondary">
                      <span class="flex h-7 w-7 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                        1
                      </span>
                      <span class="pt-0.5">
                        담당 주치의에게 진단서 발급을 요청합니다.
                      </span>
                    </li>

                    <li class="flex gap-3 text-body-md text-ink-secondary">
                      <span class="flex h-7 w-7 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                        2
                      </span>
                      <span class="pt-0.5">
                        진단서를 받아 원무과 입·퇴원 수속창구에서 직인을 받습니다.
                      </span>
                    </li>
                  </ol>
                </article>

              </div>

              <div class="mt-6 space-y-2 border-t border-hairline pt-6">
                <p class="text-body-sm text-ink-secondary">
                  ※ 퇴원 후에는 외래 진료 시 진료의사에게 진단서 발급을 요청해서 발급받습니다.
                </p>

                <p class="text-body-sm text-ink-secondary">
                  ※ 본인이 아닌 경우에는 발급이 불가할 수 있으니, 진료 예약 시 발급 가능 여부와 필요한 구비 서류를 확인 후 내원해 주세요.
                </p>

                <p class="text-body-sm text-primary">
                  진료예약 문의 : 1588-5700
                </p>
              </div>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                그 외 제증명 발급 안내
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <div class="space-y-6">

                <div>
                  <h3 class="mb-2 font-title text-title text-ink-black">
                    병원 방문
                  </h3>

                  <p class="text-body-md text-ink-secondary">
                    병원 방문 시 무인발급기에서 일부 제증명 서류를 발급받을 수 있습니다.
                  </p>

                  <p class="mt-3 mb-2 text-body-sm font-semibold text-ink-black">
                    무인 발급기 위치
                  </p>

                  <ul class="space-y-1 text-body-sm text-ink-secondary">
                    <li>· 1층 공용 원무창구 앞</li>
                    <li>· 1층 재활정형외과 원무창구 옆</li>
                    <li>· 2층 공용 원무창구 앞</li>
                  </ul>
                </div>

                <div class="overflow-x-auto">
                  <table class="w-full min-w-[560px] border-collapse border border-hairline text-left">
                    <thead>
                      <tr class="bg-surface-container-low">
                        <th class="border border-hairline px-4 py-3 text-body-sm font-semibold text-ink-black">
                          제증명 종류
                        </th>
                        <th class="border border-hairline px-4 py-3 text-body-sm font-semibold text-ink-black">
                          확인 사항
                        </th>
                        <th class="border border-hairline px-4 py-3 text-body-sm font-semibold text-ink-black">
                          발급 방법
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr class="hover:bg-surface-container-low">
                        <td class="border border-hairline px-4 py-3 text-body-sm text-ink-black">
                          진료 사실 확인서
                        </td>
                        <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                          통원 일자만 기재되어 있음
                        </td>
                        <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                          무인발급기
                        </td>
                      </tr>

                      <tr class="hover:bg-surface-container-low">
                        <td class="border border-hairline px-4 py-3 text-body-sm text-ink-black">
                          입·퇴원사실 확인서
                        </td>
                        <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                          입원 기간만 기재되어 있음
                        </td>
                        <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                          무인발급기
                        </td>
                      </tr>

                      <tr class="hover:bg-surface-container-low">
                        <td class="border border-hairline px-4 py-3 text-body-sm text-ink-black">
                          연말정산용 장애인증명서
                        </td>
                        <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                          연말정산용
                        </td>
                        <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                          무인발급기
                        </td>
                      </tr>

                      <tr class="hover:bg-surface-container-low">
                        <td class="border border-hairline px-4 py-3 text-body-sm text-ink-black">
                          진료비 납입 확인서
                        </td>
                        <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                          연말정산 겸용
                        </td>
                        <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                          무인발급기
                        </td>
                      </tr>

                      <tr class="hover:bg-surface-container-low">
                        <td class="border border-hairline px-4 py-3 text-body-sm text-ink-black">
                          진료비 계산서·영수증 재발급 및 상세 내역서
                        </td>
                        <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                          재발급·상세내역
                        </td>
                        <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                          무인발급기 · 원무과
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                제증명 창구 위치 및 업무 시간
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">

                <article class="border border-hairline p-5">
                  <h3 class="mb-3 font-title text-title text-ink-black">
                    외래 환자
                  </h3>

                  <ul class="space-y-2 text-body-sm text-ink-secondary">
                    <li>· 1층 제증명 창구</li>
                    <li>· 2층 외래 제증명 창구</li>
                    <li>· 평일 08:30 ~ 18:00</li>
                    <li>· 토요일 09:00 ~ 13:00</li>
                  </ul>
                </article>

                <article class="border border-hairline p-5">
                  <h3 class="mb-3 font-title text-title text-ink-black">
                    입원 환자
                  </h3>

                  <ul class="space-y-2 text-body-sm text-ink-secondary">
                    <li>· 2층 입·퇴원 수속·제증명 창구</li>
                    <li>· 평일 09:00 ~ 18:00</li>
                    <li>· 주말 및 공휴일 09:00 ~ 13:00</li>
                    <li>· 설·추석 당일 등 일부 휴무</li>
                  </ul>
                </article>

              </div>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white" id="documents">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                제증명 재발급 시 구비 서류
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <div class="space-y-8">

                <div>
                  <h3 class="mb-4 font-title text-title text-ink-black">
                    환자의 동의가 가능한 경우
                  </h3>

                  <div class="overflow-x-auto">
                    <table class="w-full min-w-[640px] border-collapse border border-hairline text-left">
                      <thead>
                        <tr class="bg-surface-container-low">
                          <th class="w-[30%] border border-hairline px-4 py-3 text-body-sm font-semibold text-ink-black">
                            방문자
                          </th>
                          <th class="border border-hairline px-4 py-3 text-body-sm font-semibold text-ink-black">
                            구비 서류
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr class="align-top hover:bg-surface-container-low">
                          <td class="border border-hairline px-4 py-3 text-body-sm text-ink-black">
                            본인
                          </td>
                          <td class="border border-hairline px-4 py-3">
                            <ul class="space-y-1 text-body-sm text-ink-secondary">
                              <li>· 본인 신분증</li>
                            </ul>
                          </td>
                        </tr>

                        <tr class="align-top hover:bg-surface-container-low">
                          <td class="border border-hairline px-4 py-3 text-body-sm text-ink-black">
                            배우자 및 직계 가족
                          </td>
                          <td class="border border-hairline px-4 py-3">
                            <ul class="space-y-1 text-body-sm text-ink-secondary">
                              <li>· 환자 신분증 사본</li>
                              <li>· 가족관계증명서, 주민등록등본 등 친족 관계 확인 서류</li>
                              <li>· 환자가 자필 서명한 동의서</li>
                              <li>· 방문자 신분증</li>
                            </ul>
                          </td>
                        </tr>

                        <tr class="align-top hover:bg-surface-container-low">
                          <td class="border border-hairline px-4 py-3 text-body-sm text-ink-black">
                            환자가 지정하는 대리인
                          </td>
                          <td class="border border-hairline px-4 py-3">
                            <ul class="space-y-1 text-body-sm text-ink-secondary">
                              <li>· 환자 신분증 사본</li>
                              <li>· 환자가 자필 서명한 동의서</li>
                              <li>· 환자가 자필 서명한 위임장</li>
                              <li>· 방문자 신분증</li>
                            </ul>
                          </td>
                        </tr>

                        <tr class="align-top hover:bg-surface-container-low">
                          <td class="border border-hairline px-4 py-3 text-body-sm text-ink-black">
                            환자가 14세 미만인 경우
                          </td>
                          <td class="border border-hairline px-4 py-3">
                            <ul class="space-y-1 text-body-sm text-ink-secondary">
                              <li>· 방문자 신분증</li>
                              <li>· 부모 또는 법정대리인 신분증 사본</li>
                              <li>· 친족 관계 확인 서류</li>
                              <li>· 부모 또는 법정대리인이 서명한 동의서</li>
                              <li>· 부모 또는 법정대리인이 서명한 위임장</li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 class="mb-4 font-title text-title text-ink-black">
                    환자의 동의가 불가능한 경우
                  </h3>

                  <p class="mb-4 text-body-sm text-ink-secondary">
                    환자의 동의가 불가능한 경우에는 직계 가족만 신청 가능합니다. 배우자 및 직계 존속·비속이 모두 없는 경우에는 형제·자매가 신청 가능하며, 관련 증빙 자료를 함께 제출해야 합니다.
                  </p>

                  <div class="overflow-x-auto">
                    <table class="w-full min-w-[640px] border-collapse border border-hairline text-left">
                      <thead>
                        <tr class="bg-surface-container-low">
                          <th class="w-[30%] border border-hairline px-4 py-3 text-body-sm font-semibold text-ink-black">
                            구분
                          </th>
                          <th class="border border-hairline px-4 py-3 text-body-sm font-semibold text-ink-black">
                            구비 서류
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr class="align-top hover:bg-surface-container-low">
                          <td class="border border-hairline px-4 py-3 text-body-sm text-ink-black">
                            환자가 사망한 경우
                          </td>
                          <td class="border border-hairline px-4 py-3">
                            <ul class="space-y-1 text-body-sm text-ink-secondary">
                              <li>· 방문자 신분증</li>
                              <li>· 친족 관계 확인 서류</li>
                              <li>· 사망 사실 확인 서류</li>
                            </ul>
                          </td>
                        </tr>

                        <tr class="align-top hover:bg-surface-container-low">
                          <td class="border border-hairline px-4 py-3 text-body-sm text-ink-black">
                            환자가 자필 서명을 할 수 없는 경우
                          </td>
                          <td class="border border-hairline px-4 py-3">
                            <ul class="space-y-1 text-body-sm text-ink-secondary">
                              <li>· 방문자 신분증</li>
                              <li>· 친족 관계 확인 서류</li>
                              <li>· 자필 서명 불가를 확인할 수 있는 진단서</li>
                            </ul>
                          </td>
                        </tr>

                        <tr class="align-top hover:bg-surface-container-low">
                          <td class="border border-hairline px-4 py-3 text-body-sm text-ink-black">
                            환자가 행방불명인 경우
                          </td>
                          <td class="border border-hairline px-4 py-3">
                            <ul class="space-y-1 text-body-sm text-ink-secondary">
                              <li>· 방문자 신분증</li>
                              <li>· 친족 관계 확인 서류</li>
                              <li>· 행방불명 사실 확인 서류</li>
                            </ul>
                          </td>
                        </tr>

                        <tr class="align-top hover:bg-surface-container-low">
                          <td class="border border-hairline px-4 py-3 text-body-sm text-ink-black">
                            환자가 의사무능력자인 경우
                          </td>
                          <td class="border border-hairline px-4 py-3">
                            <ul class="space-y-1 text-body-sm text-ink-secondary">
                              <li>· 방문자 신분증</li>
                              <li>· 친족 관계 확인 서류</li>
                              <li>· 의사무능력자임을 확인할 수 있는 서류</li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                주의사항
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <ul class="space-y-3">

                <li class="flex gap-2 text-body-sm text-ink-secondary">
                  <span class="mt-0.5 shrink-0 text-primary">ⓘ</span>
                  의료법에 따라 구비 서류를 확인한 후 발급합니다.
                </li>

                <li class="flex gap-2 text-body-sm text-ink-secondary">
                  <span class="mt-0.5 shrink-0 text-primary">ⓘ</span>
                  진단서 재발급은 발급일로부터 3년 이내 서류만 가능합니다.
                </li>

                <li class="flex gap-2 text-body-sm text-ink-secondary">
                  <span class="mt-0.5 shrink-0 text-primary">ⓘ</span>
                  채용신체검사서 재발급은 발급일로부터 1년 이내이며, 본인 방문 시에만 가능합니다.
                </li>

                <li class="flex gap-2 text-body-sm text-ink-secondary">
                  <span class="mt-0.5 shrink-0 text-primary">ⓘ</span>
                  제증명 서류 발급 유무는 개인정보보호를 위해 유선으로 확인할 수 없습니다.
                </li>

              </ul>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                재발급이 불가능한 서류
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <ul class="mb-4 space-y-1 text-body-sm text-ink-secondary">
                <li>· 장기요양의사소견서</li>
                <li>· 방문간호지시서</li>
                <li>· 장애진단서</li>
                <li>· 국민연금·공무원연금·사학연금 장애심사용 진단서</li>
                <li>· 근로능력평가용 진단서</li>
                <li>· 산재서류</li>
                <li>· 외부 양식의 서류 등</li>
              </ul>

              <p class="text-body-sm text-ink-secondary">
                ※ 재발급이 불가능한 서류가 다시 필요한 경우에는 진료 예약 후 진료 시 서류를 새로 작성받아 발급받으셔야 합니다.
              </p>
            </div>
          </section>

        </div>

        <aside class="h-fit space-y-gutter lg:sticky lg:top-28">

          <div class="border border-hairline bg-canvas-white p-6 md:p-8">
            <h2 class="mb-4 font-headline-2 text-headline-2 text-ink-black">
              빠른 안내
            </h2>

            <ul class="space-y-3 text-body-sm text-ink-secondary">
              <li class="flex gap-2">
                <span class="shrink-0 text-primary">📝</span>
                병명이 기재된 진단서는 진료 후 의사 요청·수납 시 발급
              </li>

              <li class="flex gap-2">
                <span class="shrink-0 text-primary">🖨</span>
                일부 제증명은 무인발급기에서 발급 가능
              </li>

              <li class="flex gap-2">
                <span class="shrink-0 text-primary">⏰</span>
                재발급은 발급일 기준 3년 이내, 일부 서류는 제한
              </li>
            </ul>
          </div>

          <div class="divide-y divide-hairline border border-hairline bg-canvas-white">

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/reservation/form">
              <span class="flex items-center gap-2">
                <span class="text-primary">📅</span>
                인터넷 진료예약
              </span>
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/document/medical-bill">
              <span class="flex items-center gap-2">
                <span class="text-primary">🧾</span>
                진료비계산서
              </span>
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/document/medical-records">
              <span class="flex items-center gap-2">
                <span class="text-primary">📁</span>
                의무기록 사본 발급
              </span>
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/faq/list">
              <span class="flex items-center gap-2">
                <span class="text-primary">?</span>
                FAQ
              </span>
              <span class="text-primary">&gt;</span>
            </a>

          </div>

          <div class="border border-hairline bg-canvas-white p-6 md:p-8">
            <h2 class="mb-4 font-headline-2 text-headline-2 text-ink-black">
              문의
            </h2>

            <ul class="space-y-4 text-body-sm text-ink-secondary">

              <li class="flex gap-3">
                <span class="shrink-0 text-primary">☎</span>

                <div>
                  <p class="font-semibold text-ink-black">
                    예약센터
                  </p>

                  <p class="mt-1">
                    1588-5700
                  </p>
                </div>
              </li>

              <li class="flex gap-3">
                <span class="shrink-0 text-primary">📄</span>

                <div>
                  <p class="font-semibold text-ink-black">
                    외래 제증명 창구
                  </p>

                  <p class="mt-1">
                    02-2072-2071
                  </p>
                </div>
              </li>

              <li class="flex gap-3">
                <span class="shrink-0 text-primary">🏥</span>

                <div>
                  <p class="font-semibold text-ink-black">
                    입·퇴원 제증명 창구
                  </p>

                  <p class="mt-1">
                    02-2072-2272
                  </p>
                </div>
              </li>

            </ul>
          </div>

        </aside>

      </div>

    </div>
  </main>

  <jsp:include page="/WEB-INF/views/patient/common/footer.jsp" />

</div>

</body>
</html>