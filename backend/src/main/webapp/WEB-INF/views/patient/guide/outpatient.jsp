<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>외래진료 안내 | MediBridge</title>
  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">
        <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
          진료안내
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          MediBridge 재활정형외과는 스포츠손상, 관절·척추 질환, 수술 후 재활을 전문으로 하는 정형외과·재활 전문병원입니다.
        </p>

        <p class="mt-2 text-body-md text-ink-secondary">
          외래 진료는 예약 후 내원하시면 됩니다. 초진·재진 모두 신분증 또는 환자 카드를 지참해 주세요.
        </p>
      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <div class="space-y-gutter lg:col-span-2">

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                외래 진료 시간
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <div class="overflow-x-auto">
                <table class="w-full min-w-[480px] border-collapse">
                  <thead>
                    <tr class="bg-surface-container-low">
                      <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        구분
                      </th>
                      <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        진료 시간
                      </th>
                      <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        비고
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        평일
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        오전 9시 ~ 오후 6시
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        점심시간 12:30 ~ 13:30
                      </td>
                    </tr>

                    <tr>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        토요일
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        오전 9시 ~ 오후 1시
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        -
                      </td>
                    </tr>

                    <tr>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        일·공휴일
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        휴진
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        응급 상황은 가까운 응급실을 이용해 주세요.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                초·재진 안내
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">

                <article class="border border-hairline p-5 md:p-6">
                  <div class="mb-4 flex items-center gap-3">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-on-primary">
                      <span class="text-xl">👤</span>
                    </div>

                    <h3 class="font-title text-title text-ink-black">
                      초진
                    </h3>
                  </div>

                  <ul class="space-y-2">
                    <li class="flex gap-2 text-body-sm text-ink-secondary">
                      <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                      인터넷·전화·방문 중 편한 방법으로 예약 후 내원해 주세요.
                    </li>

                    <li class="flex gap-2 text-body-sm text-ink-secondary">
                      <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                      신분증 또는 환자 카드를 지참해 주세요.
                    </li>

                    <li class="flex gap-2 text-body-sm text-ink-secondary">
                      <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                      기존 타 병원 검사 자료·영상 CD·처방전이 있으면 함께 가져오시면 진료에 도움이 됩니다.
                    </li>

                    <li class="flex gap-2 text-body-sm text-ink-secondary">
                      <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                      증상 부위와 불편한 동작, 통증 시작 시기 등을 간단히 정리해 오시면 상담이 원활합니다.
                    </li>
                  </ul>
                </article>

                <article class="border border-hairline p-5 md:p-6">
                  <div class="mb-4 flex items-center gap-3">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-on-primary">
                      <span class="text-xl">🔁</span>
                    </div>

                    <h3 class="font-title text-title text-ink-black">
                      재진
                    </h3>
                  </div>

                  <ul class="space-y-2">
                    <li class="flex gap-2 text-body-sm text-ink-secondary">
                      <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                      예약된 진료 시간 10~15분 전까지 접수 데스크에서 접수해 주세요.
                    </li>

                    <li class="flex gap-2 text-body-sm text-ink-secondary">
                      <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                      환자 카드 또는 신분증을 지참해 주세요.
                    </li>

                    <li class="flex gap-2 text-body-sm text-ink-secondary">
                      <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                      약·주사 처방, 재활치료 연장 등이 필요하면 진료 시 의료진과 상담해 주세요.
                    </li>

                    <li class="flex gap-2 text-body-sm text-ink-secondary">
                      <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                      진료 결과에 따라 도수치료·운동치료 일정이 별도로 안내될 수 있습니다.
                    </li>
                  </ul>
                </article>

              </div>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                외래 진료 흐름
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
                      예약
                    </h3>

                    <p class="mt-1 text-body-md text-ink-secondary">
                      인터넷, 전화, 방문 중 편한 방법으로 진료를 예약합니다.
                    </p>
                  </div>
                </li>

                <li class="flex gap-4 border border-hairline p-4 md:p-5">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                    2
                  </span>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      접수
                    </h3>

                    <p class="mt-1 text-body-md text-ink-secondary">
                      예약 시간에 맞춰 1층 원무과 / 외래 접수 데스크에서 접수합니다.
                    </p>
                  </div>
                </li>

                <li class="flex gap-4 border border-hairline p-4 md:p-5">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                    3
                  </span>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      진료
                    </h3>

                    <p class="mt-1 text-body-md text-ink-secondary">
                      대기실에서 안내에 따라 진료실로 이동해 의료진 진료를 받습니다.
                    </p>
                  </div>
                </li>

                <li class="flex gap-4 border border-hairline p-4 md:p-5">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                    4
                  </span>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      검사·처치
                    </h3>

                    <p class="mt-1 text-body-md text-ink-secondary">
                      필요 시 X-ray, 초음파 등 검사 또는 주사·처치를 진행합니다.
                    </p>
                  </div>
                </li>

                <li class="flex gap-4 border border-hairline p-4 md:p-5">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-body-sm text-on-primary">
                    5
                  </span>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      재활치료·수납
                    </h3>

                    <p class="mt-1 text-body-md text-ink-secondary">
                      도수·운동치료 예약 안내 후 수납 창구에서 진료비를 정산합니다.
                    </p>
                  </div>
                </li>

              </ol>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                재활치료 안내
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <p class="text-body-md text-ink-secondary">
                본원은 정형외과 진료와 함께 도수치료, 운동치료 등 재활 프로그램을 연계해 운영합니다.
              </p>

              <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

                <article class="border border-hairline bg-surface-container-low p-4">
                  <h3 class="font-title text-title text-ink-black">
                    도수치료
                  </h3>

                  <p class="mt-2 text-body-sm text-ink-secondary">
                    관절 가동 범위 회복, 자세 교정, 통증 완화를 위한 1:1 치료입니다.
                  </p>
                </article>

                <article class="border border-hairline bg-surface-container-low p-4">
                  <h3 class="font-title text-title text-ink-black">
                    운동치료
                  </h3>

                  <p class="mt-2 text-body-sm text-ink-secondary">
                    근력·유연성 강화, 기능 회복을 위한 맞춤형 운동 프로그램입니다.
                  </p>
                </article>

                <article class="border border-hairline bg-surface-container-low p-4">
                  <h3 class="font-title text-title text-ink-black">
                    치료 전 준비
                  </h3>

                  <p class="mt-2 text-body-sm text-ink-secondary">
                    편한 운동복, 운동화, 수건을 지참해 주세요. 치료실 안내에 따라 준비합니다.
                  </p>
                </article>

              </div>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                진료 시 유의사항
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <ul class="space-y-3">

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  예약 시간을 지키시면 원활한 진료 진행에 도움이 됩니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  진료 변경·취소는 예약안내를 참고해 주시고, 당일 변경은 예약센터로 문의해 주세요.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  재활치료는 별도 예약이 필요할 수 있으며, 치료실 일정에 따라 대기 시간이 발생할 수 있습니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  만 14세 미만 소아 환자는 보호자 동반이 필요합니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  감염 예방을 위해 마스크 착용을 권장합니다.
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
               href="${ctx}/patient/guide/reservation">
              <span class="flex items-center gap-2">
                <span class="text-primary">📅</span>
                예약안내
              </span>
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/reservation/list">
              <span class="flex items-center gap-2">
                <span class="text-primary">✅</span>
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
                외래진료 FAQ
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