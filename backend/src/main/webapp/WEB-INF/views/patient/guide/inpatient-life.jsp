<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>입원생활안내 | MediBridge</title>
  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">
        <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
          입원생활안내
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          MediBridge 재활정형외과 입원 생활은 재활 치료와 편안한 회복을 위해 안내해 드립니다.
        </p>

        <p class="mt-2 text-body-md text-ink-secondary">
          병동 생활, 식사, 면회, 재활치료 일정 등 입원 중 궁금하신 사항을 미리 확인해 주세요.
        </p>
      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <div class="space-y-gutter lg:col-span-2">

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                병동 일과
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <div class="overflow-x-auto">
                <table class="w-full min-w-[520px] border-collapse">
                  <thead>
                    <tr class="bg-surface-container-low">
                      <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        시간
                      </th>
                      <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        내용
                      </th>
                      <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        비고
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        07:00 ~ 08:00
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        기상·세면
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        개인 위생용품은 병실 내 사용
                      </td>
                    </tr>

                    <tr>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        08:00 ~ 09:00
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        아침 식사
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        -
                      </td>
                    </tr>

                    <tr>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        09:00 ~ 12:00
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        회진·재활치료·검사
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        치료 일정은 개인별로 상이
                      </td>
                    </tr>

                    <tr>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        12:30 ~ 13:30
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        점심 식사
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        -
                      </td>
                    </tr>

                    <tr>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        14:00 ~ 17:00
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        재활치료·처치·휴식
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        -
                      </td>
                    </tr>

                    <tr>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        17:30 ~ 18:30
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        저녁 식사
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        -
                      </td>
                    </tr>

                    <tr>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        19:00 ~ 21:00
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        자유 시간·면회
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        면회 시간 준수
                      </td>
                    </tr>

                    <tr>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        21:00 이후
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        취침 준비
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        정숙한 병동 분위기 유지
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
                병동 시설
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <article class="flex gap-4 border border-hairline p-4">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-on-primary">
                    🛏
                  </div>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      병실
                    </h3>

                    <p class="mt-1 text-body-sm text-ink-secondary">
                      2~4인실로 운영되며, 침대·옷장·개인 수납 공간이 제공됩니다.
                    </p>
                  </div>
                </article>

                <article class="flex gap-4 border border-hairline p-4">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-on-primary">
                    🚿
                  </div>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      화장실·샤워실
                    </h3>

                    <p class="mt-1 text-body-sm text-ink-secondary">
                      병동 내 공용 및 병실 내 부속 시설을 이용하실 수 있습니다.
                    </p>
                  </div>
                </article>

                <article class="flex gap-4 border border-hairline p-4">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-on-primary">
                    🏋
                  </div>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      재활치료실
                    </h3>

                    <p class="mt-1 text-body-sm text-ink-secondary">
                      도수치료·운동치료 등 입원 재활 프로그램이 진행됩니다.
                    </p>
                  </div>
                </article>

                <article class="flex gap-4 border border-hairline p-4">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-on-primary">
                    ☕
                  </div>

                  <div>
                    <h3 class="font-title text-title text-ink-black">
                      휴게 공간
                    </h3>

                    <p class="mt-1 text-body-sm text-ink-secondary">
                      병동 로비 및 휴게 공간에서 가벼운 휴식이 가능합니다.
                    </p>
                  </div>
                </article>

              </div>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                식사 안내
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <p class="text-body-md text-ink-secondary">
                입원 환자 식사는 영양사가 구성한 식단에 따라 제공됩니다.
              </p>

              <ul class="mt-4 space-y-2">
                <li class="flex gap-2 text-body-sm text-ink-secondary">
                  <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                  아침 08:00 / 점심 12:30 / 저녁 17:30에 제공됩니다.
                </li>

                <li class="flex gap-2 text-body-sm text-ink-secondary">
                  <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                  식사 시간은 병동 상황에 따라 조정될 수 있습니다.
                </li>

                <li class="flex gap-2 text-body-sm text-ink-secondary">
                  <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                  알레르기·특정 식품 제한이 있는 경우 입원 시 간호사에게 알려 주세요.
                </li>

                <li class="flex gap-2 text-body-sm text-ink-secondary">
                  <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
                  외부 음식 반입은 감염·알레르기 예방을 위해 제한될 수 있습니다.
                </li>
              </ul>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white" id="visiting">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                면회·병문안 안내
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <ul class="space-y-3">
                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">👥</span>
                  면회 시간: 평일 19:00 ~ 21:00 / 토·일·공휴일 10:00 ~ 12:00, 19:00 ~ 21:00
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">👥</span>
                  1회 면회 인원은 2명 이내를 권장합니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">👥</span>
                  발열·호흡기 증상이 있는 분은 면회를 자제해 주세요.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">👥</span>
                  면회 시 마스크 착용을 권장하며, 병동 내 정숙을 지켜 주세요.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">👥</span>
                  소아·노약자 면회는 간호사와 상의 후 가능합니다.
                </li>
              </ul>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                입원 중 재활치료
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <p class="text-body-md text-ink-secondary">
                재활정형외과 입원의 핵심은 체계적인 재활 치료입니다.
              </p>

              <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

                <article class="border border-hairline bg-surface-container-low p-4">
                  <h3 class="font-title text-title text-ink-black">
                    치료 일정
                  </h3>

                  <p class="mt-2 text-body-sm text-ink-secondary">
                    담당 의료진·치료사가 정한 일정에 따라 도수·운동치료를 받습니다.
                  </p>
                </article>

                <article class="border border-hairline bg-surface-container-low p-4">
                  <h3 class="font-title text-title text-ink-black">
                    치료 준비
                  </h3>

                  <p class="mt-2 text-body-sm text-ink-secondary">
                    운동복, 운동화, 수건을 준비해 주세요. 치료 전후 충분한 휴식이 필요합니다.
                  </p>
                </article>

                <article class="border border-hairline bg-surface-container-low p-4">
                  <h3 class="font-title text-title text-ink-black">
                    협조 요청
                  </h3>

                  <p class="mt-2 text-body-sm text-ink-secondary">
                    치료사 안내에 적극 협조해 주시면 회복에 도움이 됩니다.
                  </p>
                </article>

              </div>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                병동 생활 수칙
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <ul class="space-y-3">

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  병동 내 흡연·음주는 금지입니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  전열기·전기장판 등 개인 전열기 사용은 화재 예방을 위해 제한됩니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  귀중품은 본인이 관리해 주시고, 분실 시 병원에서 책임지지 않습니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  다른 환자의 휴식을 방해하지 않도록 통화·대화 시 소음에 유의해 주세요.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  응급 상황 시 병실 호출벨 또는 간호사실로 연락해 주세요.
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
                <span class="shrink-0 text-primary">🏥</span>

                <div>
                  <p class="font-semibold text-ink-black">
                    병동 간호사실
                  </p>

                  <p class="mt-1">
                    02-1234-5680
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
               href="${ctx}/patient/guide/visitation">
              <span class="flex items-center gap-2">
                <span class="text-primary">👥</span>
                문병안내
              </span>
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/guide/admission">
              <span class="flex items-center gap-2">
                <span class="text-primary">🏥</span>
                입원절차
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