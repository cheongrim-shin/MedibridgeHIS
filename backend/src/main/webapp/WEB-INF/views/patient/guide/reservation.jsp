<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>예약안내 | MediBridge</title>
  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">
        <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
          예약안내
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          진료예약은 방문, 전화, 인터넷을 통해 하실 수 있습니다.
        </p>

        <p class="mt-2 text-body-md text-ink-secondary">
          보다 빠른 예약을 위해 환자 카드 또는 주민등록증을 지참하여 주십시오.
        </p>
      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <div class="space-y-gutter lg:col-span-2">

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                예약 방법
              </h2>
            </div>

            <div class="space-y-6 p-6 md:p-8">

              <article class="border border-hairline p-5 md:p-6">
                <div class="flex gap-4">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
                    <span class="text-2xl">🏥</span>
                  </div>

                  <div class="min-w-0 flex-1">
                    <h3 class="font-title text-title text-ink-black">
                      방문예약
                    </h3>

                    <p class="mt-2 text-body-md text-ink-secondary">
                      신분증을 지참하고 내원하시어, 진료신청서 작성 후 원무과에 제출하시면 됩니다.
                    </p>

                    <ul class="mt-4 space-y-1.5">
                      <li class="flex gap-2 text-body-sm text-ink-secondary">
                        <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                        평일: 오전 9시 ~ 오후 6시
                      </li>

                      <li class="flex gap-2 text-body-sm text-ink-secondary">
                        <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                        토요일·공휴일: 미운영
                      </li>

                      <li class="flex gap-2 text-body-sm text-ink-secondary">
                        <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                        접수 위치: 1층 원무과 / 외래 접수 데스크
                      </li>
                    </ul>
                  </div>
                </div>
              </article>

              <article class="border border-hairline p-5 md:p-6">
                <div class="flex gap-4">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
                    <span class="text-2xl">☎</span>
                  </div>

                  <div class="min-w-0 flex-1">
                    <h3 class="font-title text-title text-ink-black">
                      전화예약
                    </h3>

                    <p class="mt-2 text-body-md text-ink-secondary">
                      MediBridge 예약센터(1588-5700)에서 진료 일정을 안내해 드립니다.
                    </p>

                    <ul class="mt-4 space-y-1.5">
                      <li class="flex gap-2 text-body-sm text-ink-secondary">
                        <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                        평일: 오전 9시 ~ 오후 6시
                      </li>

                      <li class="flex gap-2 text-body-sm text-ink-secondary">
                        <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                        토요일·공휴일: 미운영
                      </li>
                    </ul>
                  </div>
                </div>
              </article>

              <article class="border border-hairline p-5 md:p-6">
                <div class="flex gap-4">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
                    <span class="text-2xl">🌐</span>
                  </div>

                  <div class="min-w-0 flex-1">
                    <h3 class="font-title text-title text-ink-black">
                      인터넷예약
                    </h3>

                    <p class="mt-2 text-body-md text-ink-secondary">
                      본원 재진 환자는 휴대전화 인증과 생년월일로 로그인한 뒤 인터넷 예약을 이용하실 수 있습니다.
                    </p>

                    <ul class="mt-4 space-y-1.5">
                      <li class="flex gap-2 text-body-sm text-ink-secondary">
                        <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                        인터넷 예약은 24시간 이용 가능합니다.
                      </li>
                    </ul>

                    <div class="mt-4 flex flex-wrap gap-2">
                      <a class="inline-flex items-center gap-1 border border-primary bg-primary px-4 py-2 text-body-sm text-on-primary transition-opacity hover:opacity-90"
                         href="${ctx}/patient/reservation/form">
                        인터넷 예약하기
                        <span>&gt;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>

            </div>
          </section>

          <section class="border border-hairline bg-canvas-white" id="cancellation">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                예약취소
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <ul class="space-y-3">
                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  인터넷 예약자는 전화 예약하신 분들도 홈페이지에서 간편하게 예약을 취소하실 수 있습니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  인터넷을 통한 예약 취소는 진료일 전 자정(24:00)까지만 가능합니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  진료와 함께 검사가 예약되어 있거나 진료비를 사전에 수납하신 경우 인터넷 예약 취소가 불가하오니 예약센터(1588-5700)로 전화해 주시기 바랍니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  소중한 진료 시간이 다른 분께 양보될 수 있도록 가능한 빨리 취소 의사를 밝혀 주십시오.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  예약 변경·취소 없이 진료를 받지 않을 경우 홈페이지 진료 예약 서비스 이용이 제한될 수 있습니다.
                </li>
              </ul>

              <div class="mt-6">
                <a class="inline-flex items-center gap-2 border border-hairline px-4 py-3 text-body-md text-ink-black transition-colors hover:border-primary hover:text-primary"
                   href="${ctx}/patient/reservation/list">
                  예약 확인 / 취소 바로가기
                  <span class="text-primary">&gt;</span>
                </a>
              </div>
            </div>
          </section>

        </div>

        <aside class="h-fit space-y-gutter lg:sticky lg:top-28">

          <div class="border border-hairline bg-canvas-white p-6 md:p-8">
            <h2 class="mb-4 font-headline-2 text-headline-2 text-ink-black">
              문의 안내
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
                <span class="shrink-0 text-primary">⏰</span>
                <div>
                  <p class="font-semibold text-ink-black">
                    상담 시간
                  </p>
                  <p class="mt-1">
                    평일 09:00 ~ 18:00 (토·공휴일 제외)
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div class="divide-y divide-hairline border border-hairline bg-canvas-white">

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/reservation/list">
              <span class="flex items-center gap-2">
                <span class="text-primary">📅</span>
                예약 확인 / 취소
              </span>
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/doctor/list">
              <span class="flex items-center gap-2">
                <span class="text-primary">👥</span>
                의료진 소개
              </span>
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/faq/list">
              <span class="flex items-center gap-2">
                <span class="text-primary">?</span>
                진료예약 FAQ
              </span>
              <span class="text-primary">&gt;</span>
            </a>

          </div>

        </aside>

      </div>

    </div>
  </main>

  <jsp:include page="/WEB-INF/views/patient/common/footer.jsp" />

</div>

</body>
</html>