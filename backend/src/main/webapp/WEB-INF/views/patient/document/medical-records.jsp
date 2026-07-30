<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>의무기록 및 영상검사 사본발급 | MediBridge</title>
  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">
        <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
          의무기록 및 영상검사 사본발급
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          MediBridge 재활정형외과 의무기록 및 영상검사 사본 발급 안내입니다.
        </p>

        <p class="mt-2 text-body-md text-ink-secondary">
          진료 예약이 없어도 구비 서류를 지참하고 의무기록·영상발급 창구를 방문하시면 신청하실 수 있습니다.
        </p>
      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <div class="space-y-gutter lg:col-span-2">

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                발급 안내
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <div class="overflow-x-auto">
                <table class="w-full min-w-[560px] border-collapse">
                  <tbody>
                    <tr>
                      <th class="w-[28%] border border-hairline bg-surface-container-low px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        발급 시간
                      </th>
                      <td class="whitespace-pre-line border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        평일 09:00 ~ 18:00 / 토요일 09:00 ~ 13:00<br/>
                        ※ 발급 신청 마감: 업무 종료 30분 전<br/>
                        ※ 공휴일 및 병원 휴무일은 미운영
                      </td>
                    </tr>

                    <tr>
                      <th class="w-[28%] border border-hairline bg-surface-container-low px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        발급 장소
                      </th>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        1층 원무과 · 의무기록 / 영상(CD) 발급 창구
                      </td>
                    </tr>

                    <tr>
                      <th class="w-[28%] border border-hairline bg-surface-container-low px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        발급 수수료
                      </th>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        의무기록: 1~5장 장당 1,000원, 6장부터 장당 100원<br/>
                        영상: CD 1장당 10,000원 / DVD 1장당 20,000원<br/>
                        ※ 보건복지부 고시 기준에 따름
                      </td>
                    </tr>

                    <tr>
                      <th class="w-[28%] border border-hairline bg-surface-container-low px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        문의처
                      </th>
                      <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                        1588-5700 / 의무기록·영상발급 창구 02-1234-5681
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
                신청 시 구비서류 안내
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <p class="mb-6 text-body-md text-ink-secondary">
                의무기록 및 영상검사 사본 발급 신청 시 의료법 제21조 및 동법 시행규칙 제13조의3에 따라 아래 서류를 준비해 주세요.
              </p>

              <div class="space-y-8">

                <div>
                  <h3 class="mb-4 font-title text-title text-ink-black">
                    환자 본인 / 만 19세 미만 환자의 친권자
                  </h3>

                  <div class="overflow-x-auto">
                    <table class="w-full min-w-[640px] border-collapse">
                      <thead>
                        <tr class="bg-surface-container-low">
                          <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                            신청자
                          </th>
                          <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                            구비서류
                          </th>
                          <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                            비고
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td class="border border-hairline px-4 py-3 align-top text-body-sm text-ink-black">
                            환자 본인
                          </td>
                          <td class="border border-hairline px-4 py-3 align-top text-body-sm text-ink-secondary">
                            · 본인 신분증
                          </td>
                          <td class="border border-hairline px-4 py-3 align-top text-body-sm text-ink-secondary">
                            만 10세 이상 의사능력이 있는 경우 환자 본인이 직접 신청 가능
                          </td>
                        </tr>

                        <tr>
                          <td class="border border-hairline px-4 py-3 align-top text-body-sm text-ink-black">
                            만 19세 미만 환자의 친권자
                          </td>
                          <td class="border border-hairline px-4 py-3 align-top text-body-sm text-ink-secondary">
                            · 친권자 신분증<br/>
                            · 친권자임을 확인할 수 있는 서류
                          </td>
                          <td class="border border-hairline px-4 py-3 align-top text-body-sm text-ink-secondary">
                            대리인 신청 시 대리인·친권자 신분증, 친권 확인 서류, 친권자 자필 동의서·위임장 필요
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 class="mb-4 font-title text-title text-ink-black">
                    환자의 동의를 받은 경우
                  </h3>

                  <div class="overflow-x-auto">
                    <table class="w-full min-w-[640px] border-collapse">
                      <thead>
                        <tr class="bg-surface-container-low">
                          <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                            신청자
                          </th>
                          <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                            구비서류
                          </th>
                          <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                            비고
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td class="border border-hairline px-4 py-3 align-top text-body-sm text-ink-black">
                            친족
                          </td>
                          <td class="border border-hairline px-4 py-3 align-top text-body-sm text-ink-secondary">
                            · 신청자 신분증<br/>
                            · 가족관계증명서 등 친족관계 확인서<br/>
                            · 환자 자필 서명 동의서
                          </td>
                          <td class="border border-hairline px-4 py-3 align-top text-body-sm text-ink-secondary">
                            배우자, 직계존속·비속, 배우자의 직계존속
                          </td>
                        </tr>

                        <tr>
                          <td class="border border-hairline px-4 py-3 align-top text-body-sm text-ink-black">
                            대리인
                          </td>
                          <td class="border border-hairline px-4 py-3 align-top text-body-sm text-ink-secondary">
                            · 환자 신분증 사본<br/>
                            · 신청자 신분증<br/>
                            · 환자 자필 서명 동의서<br/>
                            · 환자 자필 서명 위임장
                          </td>
                          <td class="border border-hairline px-4 py-3 align-top text-body-sm text-ink-secondary">
                            형제·자매, 지인, 보험회사 직원 등
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 class="mb-4 font-title text-title text-ink-black">
                    환자의 동의를 받을 수 없는 경우
                  </h3>

                  <div class="overflow-x-auto">
                    <table class="w-full min-w-[640px] border-collapse">
                      <thead>
                        <tr class="bg-surface-container-low">
                          <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                            신청자
                          </th>
                          <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                            구비서류
                          </th>
                          <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                            비고
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td class="border border-hairline px-4 py-3 align-top text-body-sm text-ink-black">
                            환자 사망·의식불명·중증질환·행방불명·의사무능력자
                          </td>
                          <td class="border border-hairline px-4 py-3 align-top text-body-sm text-ink-secondary">
                            · 신청자 신분증<br/>
                            · 가족관계증명서 등 친족관계 확인서<br/>
                            · 사망·의식불명·행방불명·의사무능력 등 사실 확인 서류
                          </td>
                          <td class="border border-hairline px-4 py-3 align-top text-body-sm text-ink-secondary">
                            친족이 대리인에게 위임하는 경우 위임장 및 대리인 신분증 추가
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
                서류 제출 시 유의사항
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <ul class="space-y-3">
                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  가족관계증명서, 주민등록표 등본 등 관공서 발행 서류는 발급일로부터 3개월 이내만 유효합니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  신분증은 주민등록증, 운전면허증, 여권 등 국가 발급 신분증만 인정됩니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  동의서·위임장은 환자 본인의 자필 서명만 인정됩니다. 도장·지장은 인정되지 않을 수 있습니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  동의서에는 동의 내용, 날짜, 범위가 명확히 기재되어 있어야 합니다.
                </li>
              </ul>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                관련 서식
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <p class="mb-4 text-body-md text-ink-secondary">
                동의서·위임장은 의료법 시행규칙에 지정된 별지 서식을 사용해야 합니다.
              </p>

              <div class="flex flex-wrap gap-3">
                <button class="inline-flex items-center gap-2 border border-hairline px-4 py-3 text-body-sm text-ink-black transition-colors hover:border-primary hover:text-primary"
                        type="button">
                  📄 진료기록 열람 및 사본발급 위임장
                </button>

                <button class="inline-flex items-center gap-2 border border-hairline px-4 py-3 text-body-sm text-ink-black transition-colors hover:border-primary hover:text-primary"
                        type="button">
                  📄 진료기록 열람 및 사본발급 동의서
                </button>

                <button class="inline-flex items-center gap-2 border border-hairline px-4 py-3 text-body-sm text-ink-black transition-colors hover:border-primary hover:text-primary"
                        type="button">
                  📄 진료기록 열람 및 사본발급 확인서
                </button>
              </div>

              <p class="mt-4 text-body-sm text-ink-muted">
                ※ 현재 단계에서는 화면용 버튼입니다. 실제 파일 다운로드는 정적 파일 배치 후 연결합니다.
              </p>
            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                자주하는 질문
              </h2>
            </div>

            <div class="divide-y divide-hairline">

              <article class="p-6 md:p-8">
                <h3 class="font-title text-title text-ink-black">
                  차트 복사나 검사 결과, 영상 자료는 어떻게 발급받나요?
                </h3>

                <p class="mt-3 text-body-md text-ink-secondary">
                  의무기록·영상발급 창구에 구비 서류를 제출하신 후 발급받으실 수 있습니다. 발급 범위와 수수료는 접수 시 안내해 드립니다.
                </p>
              </article>

              <article class="p-6 md:p-8">
                <h3 class="font-title text-title text-ink-black">
                  보험회사 제출용 서류는 무엇이 필요한가요?
                </h3>

                <p class="mt-3 text-body-md text-ink-secondary">
                  보험회사·기관마다 필요 서류가 다릅니다. 가입하신 보험회사에 문의하신 후 발급을 신청해 주세요.
                </p>
              </article>

              <article class="p-6 md:p-8">
                <h3 class="font-title text-title text-ink-black">
                  수술 확인서는 어떻게 발급되나요?
                </h3>

                <p class="mt-3 text-body-md text-ink-secondary">
                  별도 수술확인서 대신 수술 날짜·수술명·수술 내용이 기재된 수술기록지 사본으로 확인하실 수 있습니다.
                </p>
              </article>

              <article class="p-6 md:p-8">
                <h3 class="font-title text-title text-ink-black">
                  진단명이나 질병코드가 적힌 서류를 발급받고 싶어요.
                </h3>

                <p class="mt-3 text-body-md text-ink-secondary">
                  진단서·소견서·입퇴원확인서는 진단명·질병코드가 기재되며, 의사 면담 후 원무과에서 발급합니다.
                </p>
              </article>

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
                    발급 시간
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
               href="${ctx}/patient/fees/non-covered">
              <span class="flex items-center gap-2">
                <span class="text-primary">💳</span>
                비급여 진료비용
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
                FAQ
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