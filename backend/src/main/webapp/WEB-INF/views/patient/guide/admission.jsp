<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>입원절차 | MediBridge</title>
  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">
        <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
          입원절차
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          MediBridge 재활정형외과 입원은 외래 진료 후 담당 의료진의 판단에 따라 안내됩니다.
        </p>

        <p class="mt-2 text-body-md text-ink-secondary">
          수술 후 재활, 집중 도수·운동치료 등 치료 목적에 맞게 입원 일정과 병실을 배정해 드립니다.
        </p>
      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <div class="space-y-gutter lg:col-span-2">

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                입원 절차
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <ol class="space-y-4">

                <li class="flex gap-4 border border-hairline p-4 md:p-5">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                    1
                  </span>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      외래 진료 및 입원 결정
                    </h3>

                    <p class="mt-1 text-body-md text-ink-secondary">
                      외래 진료 후 입원 치료가 필요하다고 판단되면 담당 의료진이 입원 필요성과 치료 계획을 설명해 드립니다.
                    </p>
                  </div>
                </li>

                <li class="flex gap-4 border border-hairline p-4 md:p-5">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                    2
                  </span>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      입원 예약·병실 안내
                    </h3>

                    <p class="mt-1 text-body-md text-ink-secondary">
                      입원 예정일과 병실을 안내받습니다. 입원 일정 변경이 필요하면 입원 안내 데스크로 연락해 주세요.
                    </p>
                  </div>
                </li>

                <li class="flex gap-4 border border-hairline p-4 md:p-5">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                    3
                  </span>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      입원 전 안내
                    </h3>

                    <p class="mt-1 text-body-md text-ink-secondary">
                      금식 여부, 복용 약 조정, 준비물 등 입원 전 유의사항을 안내해 드립니다. 필요 시 입원 안내 코디네이터가 별도 연락을 드릴 수 있습니다.
                    </p>
                  </div>
                </li>

                <li class="flex gap-4 border border-hairline p-4 md:p-5">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                    4
                  </span>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      입원 수속
                    </h3>

                    <p class="mt-1 text-body-md text-ink-secondary">
                      입원 당일 신분증, 건강보험증 또는 보험 확인 서류를 지참하고 1층 입원 수속 창구에서 등록합니다.
                    </p>
                  </div>
                </li>

                <li class="flex gap-4 border border-hairline p-4 md:p-5">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                    5
                  </span>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      병동 입실·치료 시작
                    </h3>

                    <p class="mt-1 text-body-md text-ink-secondary">
                      병동 간호사의 안내에 따라 병실에 입실하고, 입원 기록 작성 후 재활·치료 일정에 따라 진료가 시작됩니다.
                    </p>
                  </div>
                </li>

              </ol>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                입원 수속 시 필요 서류
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <ul class="space-y-3">

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">✓</span>
                  신분증(주민등록증, 운전면허증 등)
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">✓</span>
                  건강보험증 또는 보험 자격 확인 서류
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">✓</span>
                  환자 카드(재진 환자)
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">✓</span>
                  기존 검사 자료·영상 CD(해당 시)
                </li>

              </ul>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                입원 준비물
              </h2>
            </div>

            <div class="p-6 md:p-8">

              <div class="grid grid-cols-1 gap-6 md:grid-cols-3">

                <article class="border border-hairline bg-surface-container-low p-4">
                  <h3 class="font-title text-title text-ink-black">
                    필수
                  </h3>

                  <ul class="mt-3 space-y-1.5 text-body-sm text-ink-secondary">
                    <li>· 세면도구, 수건</li>
                    <li>· 슬리퍼</li>
                    <li>· 개인 복용약(의료진 확인 후)</li>
                    <li>· 편한 실내 복장·속옷</li>
                  </ul>
                </article>

                <article class="border border-hairline bg-surface-container-low p-4">
                  <h3 class="font-title text-title text-ink-black">
                    재활치료 시
                  </h3>

                  <ul class="mt-3 space-y-1.5 text-body-sm text-ink-secondary">
                    <li>· 운동화</li>
                    <li>· 운동복</li>
                    <li>· 수건</li>
                    <li>· 물병</li>
                  </ul>
                </article>

                <article class="border border-hairline bg-surface-container-low p-4">
                  <h3 class="font-title text-title text-ink-black">
                    기타
                  </h3>

                  <ul class="mt-3 space-y-1.5 text-body-sm text-ink-secondary">
                    <li>· 안경·보청기 등 개인 보조기구</li>
                    <li>· 휴지, 물티슈 등 개인 위생용품</li>
                    <li>· 개인 충전기</li>
                    <li>· 필요한 개인 물품</li>
                  </ul>
                </article>

              </div>

              <p class="mt-4 text-body-sm text-ink-muted">
                ※ 귀중품은 가급적 가져오지 않으시고, 필요 시 병원 보관함 이용을 권장합니다.
              </p>

            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                유의사항
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <ul class="space-y-3">

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  입원 일정은 병실 상황과 치료 계획에 따라 변경될 수 있습니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  입원 전 금식·약 복용 중단 여부는 의료진 안내에 따라 주세요.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  면회 시간·병문안 규정은 입원생활안내를 참고해 주세요.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  입원 관련 문의는 입원 안내 데스크 또는 예약센터로 연락해 주세요.
                </li>

              </ul>
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
                <span class="shrink-0 text-primary">💬</span>

                <div>
                  <p class="font-semibold text-ink-black">
                    입원 안내 데스크
                  </p>

                  <p class="mt-1">
                    02-1234-5679
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
               href="${ctx}/patient/guide/inpatient-life">
              <span class="flex items-center gap-2">
                <span class="text-primary">🏨</span>
                입원생활안내
              </span>
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/guide/discharge">
              <span class="flex items-center gap-2">
                <span class="text-primary">🚪</span>
                퇴원절차
              </span>
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/guide/outpatient">
              <span class="flex items-center gap-2">
                <span class="text-primary">🏥</span>
                진료안내
              </span>
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/guide/reservation">
              <span class="flex items-center gap-2">
                <span class="text-primary">📅</span>
                예약안내
              </span>
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/faq/list">
              <span class="flex items-center gap-2">
                <span class="text-primary">?</span>
                입·퇴원 FAQ
              </span>
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/directions">
              <span class="flex items-center gap-2">
                <span class="text-primary">📍</span>
                오시는길
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