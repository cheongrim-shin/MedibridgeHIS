<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<c:set var="activeCategory" value="all" />
<c:if test="${not empty param.category}">
  <c:set var="activeCategory" value="${param.category}" />
</c:if>

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>원내 편의시설 | MediBridge</title>
  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">
        <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
          원내 편의시설
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          MediBridge 재활정형외과 내 이용 가능한 편의시설을 안내합니다.
        </p>

        <p class="mt-2 text-body-md text-ink-secondary">
          전문 병원 규모에 맞춰 로비 중심의 소규모 시설을 운영하고 있습니다.
        </p>
      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <div class="space-y-gutter lg:col-span-2">

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low p-4 md:p-6">

              <div class="flex flex-col gap-4">

                <div class="flex flex-wrap gap-2">

                  <a class="border px-4 py-2 text-body-sm transition-colors
                     ${activeCategory eq 'all' ? 'border-primary bg-primary text-on-primary' : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'}"
                     href="${ctx}/patient/facility/internal?category=all">
                    전체
                    <span class="ml-1 text-body-sm">(5)</span>
                  </a>

                  <a class="border px-4 py-2 text-body-sm transition-colors
                     ${activeCategory eq 'food' ? 'border-primary bg-primary text-on-primary' : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'}"
                     href="${ctx}/patient/facility/internal?category=food">
                    식당·카페
                    <span class="ml-1 text-body-sm">(1)</span>
                  </a>

                  <a class="border px-4 py-2 text-body-sm transition-colors
                     ${activeCategory eq 'shop' ? 'border-primary bg-primary text-on-primary' : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'}"
                     href="${ctx}/patient/facility/internal?category=shop">
                    매장
                    <span class="ml-1 text-body-sm">(1)</span>
                  </a>

                  <a class="border px-4 py-2 text-body-sm transition-colors
                     ${activeCategory eq 'service' ? 'border-primary bg-primary text-on-primary' : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'}"
                     href="${ctx}/patient/facility/internal?category=service">
                    편의·대여
                    <span class="ml-1 text-body-sm">(2)</span>
                  </a>

                  <a class="border px-4 py-2 text-body-sm transition-colors
                     ${activeCategory eq 'finance' ? 'border-primary bg-primary text-on-primary' : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'}"
                     href="${ctx}/patient/facility/internal?category=finance">
                    금융
                    <span class="ml-1 text-body-sm">(1)</span>
                  </a>

                </div>

                <div>
                  <label class="mb-2 block text-body-sm font-semibold text-ink-black">
                    시설명 검색
                  </label>

                  <input class="w-full border border-hairline px-4 py-3 text-body-md text-ink-black outline-none focus:border-primary"
                         type="search"
                         placeholder="시설명, 위치, 품목을 입력하세요. 현재는 화면 예시용입니다." />
                </div>

              </div>

            </div>

            <div class="space-y-4 p-6 md:p-8">

              <c:if test="${activeCategory eq 'all' or activeCategory eq 'food'}">
                <article class="border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary md:p-6">
                  <div class="flex gap-4">
                    <div class="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
                      ☕
                    </div>

                    <div class="min-w-0 flex-1">
                      <div class="mb-2 flex flex-wrap items-center gap-2">
                        <h3 class="font-title text-title text-ink-black">
                          로비 카페
                        </h3>

                        <span class="border border-primary px-2 py-0.5 text-eyebrow text-primary">
                          식당·카페
                        </span>
                      </div>

                      <dl class="space-y-2 text-body-sm">
                        <div class="flex gap-2">
                          <dt class="shrink-0 font-semibold text-ink-black">
                            운영시간
                          </dt>
                          <dd class="text-ink-secondary">
                            평일 08:00 ~ 17:00 / 토요일 08:30 ~ 12:30 (일·공휴일 휴무)
                          </dd>
                        </div>

                        <div class="flex gap-2">
                          <dt class="shrink-0 font-semibold text-ink-black">
                            위치
                          </dt>
                          <dd class="text-ink-secondary">
                            1층 외래 대기실 옆
                          </dd>
                        </div>

                        <div class="flex gap-2">
                          <dt class="shrink-0 font-semibold text-ink-black">
                            메뉴
                          </dt>
                          <dd class="text-ink-secondary">
                            커피, 차, 샌드위치, 간단한 도시락
                          </dd>
                        </div>
                      </dl>

                      <ul class="mt-3 space-y-1 border-t border-hairline pt-3 text-body-sm text-ink-muted">
                        <li>※ 진료 시간에 맞춰 운영하며, 좌석은 20석 내외입니다.</li>
                      </ul>
                    </div>
                  </div>
                </article>
              </c:if>

              <c:if test="${activeCategory eq 'all' or activeCategory eq 'shop'}">
                <article class="border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary md:p-6">
                  <div class="flex gap-4">
                    <div class="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
                      🛒
                    </div>

                    <div class="min-w-0 flex-1">
                      <div class="mb-2 flex flex-wrap items-center gap-2">
                        <h3 class="font-title text-title text-ink-black">
                          로비 매점
                        </h3>

                        <span class="border border-primary px-2 py-0.5 text-eyebrow text-primary">
                          매장
                        </span>
                      </div>

                      <dl class="space-y-2 text-body-sm">
                        <div class="flex gap-2">
                          <dt class="shrink-0 font-semibold text-ink-black">
                            운영시간
                          </dt>
                          <dd class="text-ink-secondary">
                            평일 08:30 ~ 18:00 / 토요일 09:00 ~ 13:00
                          </dd>
                        </div>

                        <div class="flex gap-2">
                          <dt class="shrink-0 font-semibold text-ink-black">
                            위치
                          </dt>
                          <dd class="text-ink-secondary">
                            1층 원무 접수 데스크 옆
                          </dd>
                        </div>

                        <div class="flex gap-2">
                          <dt class="shrink-0 font-semibold text-ink-black">
                            취급품목
                          </dt>
                          <dd class="text-ink-secondary">
                            음료, 간식, 생수, 위생용품, 간단한 의료소모품
                          </dd>
                        </div>
                      </dl>

                      <ul class="mt-3 space-y-1 border-t border-hairline pt-3 text-body-sm text-ink-muted">
                        <li>※ 24시간 편의점은 원내에 없습니다.</li>
                      </ul>
                    </div>
                  </div>
                </article>
              </c:if>

              <c:if test="${activeCategory eq 'all' or activeCategory eq 'service'}">
                <article class="border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary md:p-6">
                  <div class="flex gap-4">
                    <div class="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
                      ♿
                    </div>

                    <div class="min-w-0 flex-1">
                      <div class="mb-2 flex flex-wrap items-center gap-2">
                        <h3 class="font-title text-title text-ink-black">
                          휠체어·지팡이 대여
                        </h3>

                        <span class="border border-primary px-2 py-0.5 text-eyebrow text-primary">
                          편의·대여
                        </span>
                      </div>

                      <dl class="space-y-2 text-body-sm">
                        <div class="flex gap-2">
                          <dt class="shrink-0 font-semibold text-ink-black">
                            운영시간
                          </dt>
                          <dd class="text-ink-secondary">
                            평일·토요일 진료 시간 (당일 반납)
                          </dd>
                        </div>

                        <div class="flex gap-2">
                          <dt class="shrink-0 font-semibold text-ink-black">
                            위치
                          </dt>
                          <dd class="text-ink-secondary">
                            1층 원무·안내 데스크
                          </dd>
                        </div>
                      </dl>

                      <ul class="mt-3 space-y-1 border-t border-hairline pt-3 text-body-sm text-ink-muted">
                        <li>※ 성함과 연락처를 작성 후 무료 대여</li>
                        <li>※ 정형·재활 진료 환자분께 우선 제공</li>
                      </ul>
                    </div>
                  </div>
                </article>

                <article class="border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary md:p-6">
                  <div class="flex gap-4">
                    <div class="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
                      🔌
                    </div>

                    <div class="min-w-0 flex-1">
                      <div class="mb-2 flex flex-wrap items-center gap-2">
                        <h3 class="font-title text-title text-ink-black">
                          외래 대기실 휴게·충전
                        </h3>

                        <span class="border border-primary px-2 py-0.5 text-eyebrow text-primary">
                          편의·대여
                        </span>
                      </div>

                      <dl class="space-y-2 text-body-sm">
                        <div class="flex gap-2">
                          <dt class="shrink-0 font-semibold text-ink-black">
                            운영시간
                          </dt>
                          <dd class="text-ink-secondary">
                            진료 시간과 동일
                          </dd>
                        </div>

                        <div class="flex gap-2">
                          <dt class="shrink-0 font-semibold text-ink-black">
                            위치
                          </dt>
                          <dd class="text-ink-secondary">
                            1층·2층 외래 대기실
                          </dd>
                        </div>

                        <div class="flex gap-2">
                          <dt class="shrink-0 font-semibold text-ink-black">
                            취급품목
                          </dt>
                          <dd class="text-ink-secondary">
                            휴게 좌석, 무료 휴대폰 충전 콘센트, 정수기
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </article>
              </c:if>

              <c:if test="${activeCategory eq 'all' or activeCategory eq 'finance'}">
                <article class="border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary md:p-6">
                  <div class="flex gap-4">
                    <div class="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
                      🏧
                    </div>

                    <div class="min-w-0 flex-1">
                      <div class="mb-2 flex flex-wrap items-center gap-2">
                        <h3 class="font-title text-title text-ink-black">
                          ATM
                        </h3>

                        <span class="border border-primary px-2 py-0.5 text-eyebrow text-primary">
                          금융
                        </span>
                      </div>

                      <dl class="space-y-2 text-body-sm">
                        <div class="flex gap-2">
                          <dt class="shrink-0 font-semibold text-ink-black">
                            운영시간
                          </dt>
                          <dd class="text-ink-secondary">
                            24시간
                          </dd>
                        </div>

                        <div class="flex gap-2">
                          <dt class="shrink-0 font-semibold text-ink-black">
                            위치
                          </dt>
                          <dd class="text-ink-secondary">
                            1층 로비 (정문 입구 우측)
                          </dd>
                        </div>
                      </dl>

                      <ul class="mt-3 space-y-1 border-t border-hairline pt-3 text-body-sm text-ink-muted">
                        <li>※ 입·출금 이용 가능</li>
                      </ul>
                    </div>
                  </div>
                </article>
              </c:if>

            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                층별 안내
              </h2>
            </div>

            <div class="divide-y divide-hairline">
              <article class="p-6 md:p-8">
                <h3 class="font-title text-title text-ink-black">
                  1층
                </h3>

                <ul class="mt-3 flex flex-wrap gap-2">
                  <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">원무·접수·수납</li>
                  <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">재활정형외과 외래</li>
                  <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">외래 대기실</li>
                  <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">로비 카페·매점</li>
                  <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">약제부</li>
                  <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">ATM</li>
                </ul>
              </article>

              <article class="p-6 md:p-8">
                <h3 class="font-title text-title text-ink-black">
                  2층
                </h3>

                <ul class="mt-3 flex flex-wrap gap-2">
                  <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">재활치료실</li>
                  <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">영상검사실</li>
                  <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">외래 진료실</li>
                </ul>
              </article>

              <article class="p-6 md:p-8">
                <h3 class="font-title text-title text-ink-black">
                  지하 1층
                </h3>

                <ul class="mt-3 flex flex-wrap gap-2">
                  <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">주차장</li>
                  <li class="border border-hairline px-3 py-1 text-body-sm text-ink-secondary">주차 정산</li>
                </ul>
              </article>
            </div>
          </section>

        </div>

        <aside class="h-fit space-y-gutter lg:sticky lg:top-28">

          <div class="border border-hairline bg-canvas-white p-6 md:p-8">
            <h2 class="mb-4 font-headline-2 text-headline-2 text-ink-black">
              이용 안내
            </h2>

            <ul class="space-y-3 text-body-sm text-ink-secondary">
              <li>· 본원은 정형·재활 전문 병원으로, 대형 병원 수준의 식당·매장 시설은 갖추고 있지 않습니다.</li>
              <li>· 식사가 필요하시면 로비 카페를 이용하시거나, 인근 상가를 이용해 주세요.</li>
              <li>· 운영 시간은 병원 진료 일정에 따라 변경될 수 있습니다.</li>
            </ul>
          </div>

          <div class="border border-hairline bg-canvas-white p-6 md:p-8">
            <h2 class="mb-4 font-headline-2 text-headline-2 text-ink-black">
              문의 안내
            </h2>

            <ul class="space-y-4 text-body-sm text-ink-secondary">
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
               href="${ctx}/patient/facility/external">
              <span class="flex items-center gap-2">
                <span class="text-primary">🏬</span>
                외부 편의시설
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
               href="${ctx}/patient/guide/outpatient">
              <span class="flex items-center gap-2">
                <span class="text-primary">🏥</span>
                진료안내
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