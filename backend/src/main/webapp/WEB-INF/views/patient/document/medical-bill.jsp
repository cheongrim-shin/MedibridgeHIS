<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>진료비계산서 | MediBridge</title>
  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">
        <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
          진료비계산서
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          MediBridge 재활정형외과 진료비 계산서·영수증 발급 및 재발급 안내입니다.
        </p>

        <p class="mt-2 text-body-md text-ink-secondary">
          외래·입원 진료비 문의, 계산서 재발급, 입원 중 중간 진료비 안내를 확인하실 수 있습니다.
        </p>
      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <div class="space-y-gutter lg:col-span-2">

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                1. 진료비에 대한 문의는?
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <p class="text-body-md text-ink-secondary">
                진료비 관련 문의는
                <span class="font-semibold text-ink-black"> 원무과 1588-1234</span>
                로 연락해 주세요.
              </p>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                2. 진료비계산서·영수증 재발급은 어디서 하나요?
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
                        발급 장소
                      </th>
                      <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        비고
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        외래
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-secondary">
                        1층 원무과 제증명 창구
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        평일 09:00 ~ 18:00 / 토요일 09:00 ~ 13:00
                      </td>
                    </tr>

                    <tr>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                        입원
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-md text-ink-secondary">
                        2층 원무과 창구, 입·퇴원 수속 앞 키오스크
                      </td>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        평일 09:00 ~ 18:00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <ul class="mt-6 space-y-2 border-t border-hairline pt-6">
                <li class="text-body-sm text-ink-secondary">
                  ※ 재발급 신청 시 필요 서류는
                  <a class="text-primary underline-offset-2 hover:underline"
                     href="${ctx}/patient/document/medical-records">
                    의무기록 사본발급
                  </a>
                  기준을 준용합니다.
                </li>

                <li class="text-body-sm text-ink-secondary">
                  ※ 대리인 신청 시 위임장·동의서 등 구비 서류가 필요할 수 있습니다.
                </li>

                <li class="text-body-sm text-ink-secondary">
                  ※ 현금영수증 자진발급분은 국세청 홈택스에서 「자진발급분 소비자 등록」 메뉴로 조회·등록할 수 있습니다.
                </li>
              </ul>

            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                3. 입원 중에 중간진료비 계산서가 발급되나요?
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <p class="text-body-md text-ink-secondary">
                입원 치료 기간 중 발생한 진료비를 확인하실 수 있도록 중간진료비 계산서를 발급해 드립니다.
              </p>

              <ul class="mt-4 space-y-3">
                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">🧾</span>
                  2층 원무과 창구 또는 입·퇴원 수속 앞 키오스크에서 발급 가능합니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">🧾</span>
                  재활치료·수술 후 입원 등 장기 입원 환자에게 해당될 수 있습니다.
                </li>
              </ul>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                발급 시 유의사항
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <ul class="space-y-3">
                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  본인 신청 시 신분증을 지참해 주세요.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  가족 또는 대리인이 신청하는 경우 관계 확인 서류와 위임 서류가 필요할 수 있습니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  입원 진료비 정산 내역은 퇴원 수속 시 최종 금액과 달라질 수 있습니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  보험사 제출용 서류가 필요한 경우 제출처에서 요구하는 서류명을 미리 확인해 주세요.
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
                    원무과
                  </p>

                  <p class="mt-1">
                    1588-1234
                  </p>
                </div>
              </li>

              <li class="flex gap-3">
                <span class="shrink-0 text-primary">⏰</span>

                <div>
                  <p class="font-semibold text-ink-black">
                    창구 운영
                  </p>

                  <p class="mt-1">
                    평일 09:00 ~ 18:00 / 토요일 09:00 ~ 13:00
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div class="divide-y divide-hairline border border-hairline bg-canvas-white">

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/document/diagnosis">
              <span class="flex items-center gap-2">
                <span class="text-primary">📄</span>
                진단서발급
              </span>
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/document/medical-records">
              <span class="flex items-center gap-2">
                <span class="text-primary">📁</span>
                의무기록 및 영상검사 사본발급
              </span>
              <span class="text-primary">&gt;</span>
            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/fees/non-covered">
              <span class="flex items-center gap-2">
                <span class="text-primary">💳</span>
                비급여 진료비용
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

          </div>

        </aside>

      </div>

    </div>
  </main>

  <jsp:include page="/WEB-INF/views/patient/common/footer.jsp" />

</div>

</body>
</html>