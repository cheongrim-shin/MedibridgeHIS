<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>문병안내 | MediBridge</title>
  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">
        <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
          문병안내
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          환자의 안정과 감염 예방을 위해 면회 시간을 지켜 주시고, 병동 내 정숙을 부탁드립니다.
        </p>

        <p class="mt-2 text-body-md text-ink-secondary">
          발열, 기침 등 호흡기 증상이 있는 경우 환자 안전을 위해 면회를 자제해 주세요.
        </p>
      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <div class="space-y-gutter lg:col-span-2">

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                면회 시간
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <div class="overflow-x-auto">
                <table class="w-full min-w-[520px] border-collapse">
                  <thead>
                    <tr class="bg-surface-container-low">
                      <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        구분
                      </th>
                      <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        면회 시간
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
                        19:00 ~ 21:00
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        병동 안정 시간 이후 면회 가능
                      </td>
                    </tr>

                    <tr>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        토·일·공휴일
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        10:00 ~ 12:00 / 19:00 ~ 21:00
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        병동 상황에 따라 제한될 수 있음
                      </td>
                    </tr>

                    <tr>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        집중치료·격리 환자
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        병동 문의
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        의료진·간호사 안내에 따름
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p class="mt-4 text-body-sm text-ink-muted">
                ※ 환자 상태, 감염병 상황, 병동 사정에 따라 면회 시간이 조정될 수 있습니다.
              </p>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                면회 기본 수칙
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">

                <article class="border border-hairline p-5">
                  <div class="mb-3 flex items-center gap-3">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-on-primary">
                      👥
                    </div>

                    <h3 class="font-title text-title text-ink-black">
                      면회 인원
                    </h3>
                  </div>

                  <p class="text-body-sm text-ink-secondary">
                    환자 안정과 병동 혼잡 방지를 위해 1회 면회 인원은 2명 이내를 권장합니다.
                  </p>
                </article>

                <article class="border border-hairline p-5">
                  <div class="mb-3 flex items-center gap-3">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-on-primary">
                      😷
                    </div>

                    <h3 class="font-title text-title text-ink-black">
                      마스크 착용
                    </h3>
                  </div>

                  <p class="text-body-sm text-ink-secondary">
                    감염 예방을 위해 병동 방문 시 마스크 착용을 권장합니다.
                  </p>
                </article>

                <article class="border border-hairline p-5">
                  <div class="mb-3 flex items-center gap-3">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-on-primary">
                      🔇
                    </div>

                    <h3 class="font-title text-title text-ink-black">
                      병동 정숙
                    </h3>
                  </div>

                  <p class="text-body-sm text-ink-secondary">
                    다른 환자의 휴식을 위해 병동 내 큰 소리 대화와 장시간 통화는 자제해 주세요.
                  </p>
                </article>

                <article class="border border-hairline p-5">
                  <div class="mb-3 flex items-center gap-3">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-on-primary">
                      🧴
                    </div>

                    <h3 class="font-title text-title text-ink-black">
                      손 위생
                    </h3>
                  </div>

                  <p class="text-body-sm text-ink-secondary">
                    병실 출입 전후 손 씻기 또는 손 소독제를 사용해 주세요.
                  </p>
                </article>

              </div>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                면회 제한 대상
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <ul class="space-y-3">

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  발열, 기침, 인후통 등 호흡기 증상이 있는 경우
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  최근 감염성 질환 접촉력이 있는 경우
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  음주 상태이거나 병동 질서를 해칠 우려가 있는 경우
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  의료진 또는 간호사가 환자 상태상 면회 제한이 필요하다고 판단한 경우
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  소아·노약자 면회는 환자 상태와 병동 상황에 따라 제한될 수 있습니다.
                </li>

              </ul>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                반입 제한 물품
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <div class="grid grid-cols-1 gap-4 md:grid-cols-3">

                <article class="border border-hairline bg-surface-container-low p-4">
                  <h3 class="font-title text-title text-ink-black">
                    음식물
                  </h3>

                  <p class="mt-2 text-body-sm text-ink-secondary">
                    외부 음식은 감염·알레르기 예방을 위해 반입이 제한될 수 있습니다.
                  </p>
                </article>

                <article class="border border-hairline bg-surface-container-low p-4">
                  <h3 class="font-title text-title text-ink-black">
                    전열기
                  </h3>

                  <p class="mt-2 text-body-sm text-ink-secondary">
                    전기장판, 온열기 등 개인 전열기는 화재 예방을 위해 사용이 제한됩니다.
                  </p>
                </article>

                <article class="border border-hairline bg-surface-container-low p-4">
                  <h3 class="font-title text-title text-ink-black">
                    위험 물품
                  </h3>

                  <p class="mt-2 text-body-sm text-ink-secondary">
                    날카로운 물품, 인화성 물질, 병동 질서를 방해할 수 있는 물품은 반입할 수 없습니다.
                  </p>
                </article>

              </div>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                보호자 안내
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <ul class="space-y-3">

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">✓</span>
                  보호자는 환자 상태에 따라 병동 간호사실에서 안내받은 범위 내에서 상주할 수 있습니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">✓</span>
                  보호자 교대 시 병동 간호사실에 알려 주세요.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">✓</span>
                  환자 이동, 낙상 예방, 재활치료 이동 시 간호사 또는 치료사 안내를 따라 주세요.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">✓</span>
                  병실 내 침상, 의료기기, 치료 장비는 임의로 조작하지 마세요.
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
                <span class="shrink-0 text-primary">☎</span>

                <div>
                  <p class="font-semibold text-ink-black">
                    대표전화
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
                    병동 문의
                  </p>

                  <p class="mt-1">
                    24시간 병동 간호사실 문의 가능
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
               href="${ctx}/patient/directions">
              <span class="flex items-center gap-2">
                <span class="text-primary">📍</span>
                오시는길
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