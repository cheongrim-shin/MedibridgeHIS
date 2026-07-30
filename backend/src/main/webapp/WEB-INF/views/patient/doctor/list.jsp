<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>의료진 소개 | MediBridge</title>
  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">
        <nav class="mb-6 text-body-sm text-ink-muted">
          홈 &gt; 진료안내 &gt; 의료진 소개
        </nav>

        <p class="mb-2 font-eyebrow text-eyebrow text-primary">
          재활정형외과
        </p>

        <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
          의료진 소개
        </h1>

        <p class="mt-3 whitespace-pre-line text-body-md text-ink-secondary">
          MediBridge 재활정형외과 의료진을 소개합니다.
          스포츠손상, 관절·척추 질환, 수술 후 재활까지 환자 맞춤형 진료와 체계적인 재활 프로그램을 제공합니다.
        </p>

        <ul class="mt-4 flex flex-wrap gap-2">
          <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">
            스포츠손상·관절 클리닉
          </li>
          <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">
            척추·목·어깨·무릎 재활
          </li>
          <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">
            도수·운동치료 연계 진료
          </li>
        </ul>
      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <div class="space-y-gutter lg:col-span-2">

          <article class="border border-hairline bg-canvas-white">
            <div class="flex flex-col gap-6 p-6 md:flex-row md:p-8">
              <div class="flex shrink-0 flex-col items-center md:w-40">
                <div class="h-28 w-28 overflow-hidden rounded-full border border-hairline bg-surface-container-high">
                  <img alt="김민수 원장 프로필"
                       class="h-full w-full object-cover object-top"
                       src="${ctx}/doctors/doctor-kim.png" />
                </div>
                <p class="mt-4 text-center font-headline-2 text-headline-2 text-ink-black">김민수</p>
                <p class="mt-1 text-center text-body-sm text-primary">원장</p>
              </div>

              <div class="min-w-0 flex-1">
                <div class="mb-4">
                  <h3 class="mb-2 font-title text-sm text-ink-black">전문 분야</h3>
                  <p class="text-body-sm text-ink-secondary">스포츠손상·관절재활</p>
                </div>

                <div>
                  <h3 class="mb-2 font-title text-sm text-ink-black">진료 분야</h3>
                  <ul class="flex flex-wrap gap-2">
                    <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">스포츠손상</li>
                    <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">어깨·무릎·발목 재활</li>
                    <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">수술 후 재활 계획</li>
                  </ul>
                </div>

                <div class="mt-5 border-t border-hairline pt-5">
                  <p class="text-body-sm text-ink-secondary">
                    <span class="font-semibold text-ink-black">외래 진료</span>
                    월·수·금 오전 / 화·목 오후
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article class="border border-hairline bg-canvas-white">
            <div class="flex flex-col gap-6 p-6 md:flex-row md:p-8">
              <div class="flex shrink-0 flex-col items-center md:w-40">
                <div class="h-28 w-28 overflow-hidden rounded-full border border-hairline bg-surface-container-high">
                  <img alt="이서연 과장 프로필"
                       class="h-full w-full object-cover object-top"
                       src="${ctx}/doctors/doctor-lee.png" />
                </div>
                <p class="mt-4 text-center font-headline-2 text-headline-2 text-ink-black">이서연</p>
                <p class="mt-1 text-center text-body-sm text-primary">과장</p>
              </div>

              <div class="min-w-0 flex-1">
                <div class="mb-4">
                  <h3 class="mb-2 font-title text-sm text-ink-black">전문 분야</h3>
                  <p class="text-body-sm text-ink-secondary">척추·목재활</p>
                </div>

                <div>
                  <h3 class="mb-2 font-title text-sm text-ink-black">진료 분야</h3>
                  <ul class="flex flex-wrap gap-2">
                    <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">목·허리 디스크</li>
                    <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">척추측만·자세 이상</li>
                    <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">만성 요통·목통</li>
                  </ul>
                </div>

                <div class="mt-5 border-t border-hairline pt-5">
                  <p class="text-body-sm text-ink-secondary">
                    <span class="font-semibold text-ink-black">외래 진료</span>
                    월·화·목 오전 / 수·금 오후
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article class="border border-hairline bg-canvas-white">
            <div class="flex flex-col gap-6 p-6 md:flex-row md:p-8">
              <div class="flex shrink-0 flex-col items-center md:w-40">
                <div class="h-28 w-28 overflow-hidden rounded-full border border-hairline bg-surface-container-high">
                  <img alt="박준호 전문의 프로필"
                       class="h-full w-full object-cover object-top"
                       src="${ctx}/doctors/doctor-park.png" />
                </div>
                <p class="mt-4 text-center font-headline-2 text-headline-2 text-ink-black">박준호</p>
                <p class="mt-1 text-center text-body-sm text-primary">전문의</p>
              </div>

              <div class="min-w-0 flex-1">
                <div class="mb-4">
                  <h3 class="mb-2 font-title text-sm text-ink-black">전문 분야</h3>
                  <p class="text-body-sm text-ink-secondary">어깨·무릎 재활</p>
                </div>

                <div>
                  <h3 class="mb-2 font-title text-sm text-ink-black">진료 분야</h3>
                  <ul class="flex flex-wrap gap-2">
                    <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">회전근개 손상</li>
                    <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">무릎 인대·연골 손상</li>
                    <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">관절 가동범위 회복</li>
                  </ul>
                </div>

                <div class="mt-5 border-t border-hairline pt-5">
                  <p class="text-body-sm text-ink-secondary">
                    <span class="font-semibold text-ink-black">외래 진료</span>
                    화·수·금 오전 / 월·목 오후
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article class="border border-hairline bg-canvas-white">
            <div class="flex flex-col gap-6 p-6 md:flex-row md:p-8">
              <div class="flex shrink-0 flex-col items-center md:w-40">
                <div class="h-28 w-28 overflow-hidden rounded-full border border-hairline bg-surface-container-high">
                  <img alt="최지원 전문의 프로필"
                       class="h-full w-full object-cover object-top"
                       src="${ctx}/doctors/doctor-choi.png" />
                </div>
                <p class="mt-4 text-center font-headline-2 text-headline-2 text-ink-black">최지원</p>
                <p class="mt-1 text-center text-body-sm text-primary">전문의</p>
              </div>

              <div class="min-w-0 flex-1">
                <div class="mb-4">
                  <h3 class="mb-2 font-title text-sm text-ink-black">전문 분야</h3>
                  <p class="text-body-sm text-ink-secondary">도수·운동치료</p>
                </div>

                <div>
                  <h3 class="mb-2 font-title text-sm text-ink-black">진료 분야</h3>
                  <ul class="flex flex-wrap gap-2">
                    <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">도수치료</li>
                    <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">운동처방</li>
                    <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">기능적 평가·재활</li>
                  </ul>
                </div>

                <div class="mt-5 border-t border-hairline pt-5">
                  <p class="text-body-sm text-ink-secondary">
                    <span class="font-semibold text-ink-black">외래 진료</span>
                    월·수·목 오전 / 화·금 오후
                  </p>
                </div>
              </div>
            </div>
          </article>

        </div>

        <aside class="h-fit space-y-gutter lg:sticky lg:top-28">
          <div class="border border-hairline bg-canvas-white p-6 md:p-8">
            <h2 class="mb-4 font-headline-2 text-headline-2 text-ink-black">진료 안내</h2>

            <dl class="space-y-4 text-body-sm">
              <div>
                <dt class="mb-1 text-ink-secondary">의료진</dt>
                <dd class="text-ink-black">4명</dd>
              </div>

              <div>
                <dt class="mb-1 text-ink-secondary">외래 진료</dt>
                <dd class="text-ink-black">평일 09:00 ~ 18:00 / 토요일 09:00 ~ 13:00</dd>
              </div>
            </dl>
          </div>

          <div class="divide-y divide-hairline border border-hairline bg-canvas-white">
            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/reservation/form">
              인터넷 진료예약
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/faq/list">
              FAQ
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/directions">
              오시는길
              <span class="text-primary">&gt;</span>
            </a>
          </div>

          <div class="border border-hairline bg-canvas-white p-6 md:p-8">
            <h2 class="mb-4 font-headline-2 text-headline-2 text-ink-black">예약 문의</h2>

            <ul class="space-y-4 text-body-sm text-ink-secondary">
              <li>
                <p class="font-semibold text-ink-black">예약센터</p>
                <p class="mt-1">1588-5700</p>
              </li>

              <li>
                의료진별 진료 요일은 변동될 수 있습니다. 예약 시 가능한 일정을 확인해 주세요.
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