<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>퇴원절차 | MediBridge</title>
  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">
        <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
          퇴원절차
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          MediBridge 재활정형외과 퇴원은 담당 의료진의 진료 결과와 치료 경과에 따라 안내됩니다.
        </p>

        <p class="mt-2 text-body-md text-ink-secondary">
          퇴원 후에도 외래 재활 치료를 이어 받으실 수 있도록 치료 계획과 주의사항을 안내해 드립니다.
        </p>
      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <div class="space-y-gutter lg:col-span-2">

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                퇴원 절차
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
                      퇴원 결정 및 안내
                    </h3>

                    <p class="mt-1 text-body-md text-ink-secondary">
                      담당 의료진이 퇴원 가능 여부를 판단하고, 퇴원 예정일과 이후 치료 계획을 설명해 드립니다.
                    </p>
                  </div>
                </li>

                <li class="flex gap-4 border border-hairline p-4 md:p-5">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                    2
                  </span>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      퇴원 전 점검
                    </h3>

                    <p class="mt-1 text-body-md text-ink-secondary">
                      간호사가 퇴원 전 상태를 확인하고, 복용 약·재활 운동 방법 등 퇴원 후 관리 사항을 안내합니다.
                    </p>
                  </div>
                </li>

                <li class="flex gap-4 border border-hairline p-4 md:p-5">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                    3
                  </span>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      퇴원 서류·약 수령
                    </h3>

                    <p class="mt-1 text-body-md text-ink-secondary">
                      퇴원 요약지, 처방전, 퇴원 약 등 필요 서류와 약을 수령합니다. 추가 발급이 필요하면 안내 데스크에 문의해 주세요.
                    </p>
                  </div>
                </li>

                <li class="flex gap-4 border border-hairline p-4 md:p-5">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                    4
                  </span>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      퇴원 수속·비용 정산
                    </h3>

                    <p class="mt-1 text-body-md text-ink-secondary">
                      1층 입·퇴원 수속 창구에서 퇴원 수속을 진행하고, 입원 진료비를 정산합니다.
                    </p>
                  </div>
                </li>

                <li class="flex gap-4 border border-hairline p-4 md:p-5">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                    5
                  </span>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      귀가 및 외래 재활 연계
                    </h3>

                    <p class="mt-1 text-body-md text-ink-secondary">
                      귀가 후 외래 재활 치료가 필요한 경우 일정을 안내받습니다. 인터넷·전화 예약으로 외래 진료를 이어가실 수 있습니다.
                    </p>
                  </div>
                </li>

              </ol>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                퇴원 시 안내·수령 사항
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <ul class="space-y-3">

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">✓</span>
                  퇴원 요약지(진료 경과·주의사항)
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">✓</span>
                  퇴원 처방전 및 복용 약
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">✓</span>
                  외래 재활 치료 일정 안내(해당 시)
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">✓</span>
                  진료비 계산서·영수증
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">✓</span>
                  진단서·소견서(신청 시)
                </li>

              </ul>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                퇴원 후 외래 재활 안내
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <p class="text-body-md text-ink-secondary">
                재활정형외과 특성상 퇴원 후에도 도수치료·운동치료 등 외래 재활 프로그램을 이어 받으실 수 있습니다.
              </p>

              <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

                <article class="border border-hairline bg-surface-container-low p-4">
                  <h3 class="font-title text-title text-ink-black">
                    외래 진료 예약
                  </h3>

                  <p class="mt-2 text-body-sm text-ink-secondary">
                    퇴원 시 안내받은 일정에 맞춰 외래 진료를 예약해 주세요.
                  </p>
                </article>

                <article class="border border-hairline bg-surface-container-low p-4">
                  <h3 class="font-title text-title text-ink-black">
                    재활치료
                  </h3>

                  <p class="mt-2 text-body-sm text-ink-secondary">
                    도수·운동치료는 별도 예약이 필요할 수 있으며, 치료실 일정에 따라 안내됩니다.
                  </p>
                </article>

                <article class="border border-hairline bg-surface-container-low p-4">
                  <h3 class="font-title text-title text-ink-black">
                    증상 변화
                  </h3>

                  <p class="mt-2 text-body-sm text-ink-secondary">
                    통증 악화, 염증·발열 등 이상 증상이 있으면 즉시 내원하거나 예약센터로 문의해 주세요.
                  </p>
                </article>

              </div>

              <div class="mt-6">
                <a class="inline-flex items-center gap-2 border border-primary bg-primary px-4 py-3 text-body-md text-on-primary transition-opacity hover:opacity-90"
                   href="${ctx}/patient/reservation/form">
                  외래 진료 예약하기
                  <span>&gt;</span>
                </a>
              </div>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                퇴원 후 유의사항
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <ul class="space-y-3">

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  퇴원 약은 의료진 안내에 따라 정해진 용법·용량으로 복용해 주세요.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  퇴원 후 운동·일상생활 제한 사항은 담당 의료진·치료사 안내를 따라 주세요.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  외래 진료 예약 없이 장기간 경과를 방치하지 않도록 정기적으로 내원해 주세요.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  퇴원 관련 문의는 입원 안내 데스크 또는 예약센터로 연락해 주세요.
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
               href="${ctx}/patient/guide/admission">
              <span class="flex items-center gap-2">
                <span class="text-primary">🏥</span>
                입원절차
              </span>
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/guide/inpatient-life">
              <span class="flex items-center gap-2">
                <span class="text-primary">🏨</span>
                입원생활안내
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

          </div>

        </aside>

      </div>

    </div>
  </main>

  <jsp:include page="/WEB-INF/views/patient/common/footer.jsp" />

</div>

</body>
</html>