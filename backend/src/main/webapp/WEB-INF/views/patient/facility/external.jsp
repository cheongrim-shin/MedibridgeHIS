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

  <meta name="viewport"
        content="width=device-width, initial-scale=1.0" />

  <title>외부 편의시설 | MediBridge</title>

  <link rel="stylesheet"
        href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>

<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">

    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">

        <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
          외부 편의시설
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          메디브릿지 병원 주변 정부청사역·둔산동 일대에서
          이용 가능한 식당, 매장, 약국 등을 안내합니다.
        </p>

        <p class="mt-2 text-body-md text-ink-secondary">
          아래 정보는 병원과 무관한 인근 상권 안내이며,
          운영 여부와 영업시간은 방문 전 확인해 주세요.
        </p>

      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <div class="space-y-gutter lg:col-span-2">

          <section class="border border-hairline bg-canvas-white">

            <div class="border-b border-hairline bg-surface-container-low p-4 md:p-6">

              <div class="flex flex-col gap-4">

                <div class="flex flex-wrap gap-2">

                  <a class="border px-4 py-2 text-body-sm transition-colors
                     ${activeCategory eq 'all'
                       ? 'border-primary bg-primary text-on-primary'
                       : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'}"
                     href="${ctx}/patient/facility/external?category=all">
                    전체
                    <span class="ml-1 text-body-sm">
                      (7)
                    </span>
                  </a>

                  <a class="border px-4 py-2 text-body-sm transition-colors
                     ${activeCategory eq 'food'
                       ? 'border-primary bg-primary text-on-primary'
                       : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'}"
                     href="${ctx}/patient/facility/external?category=food">
                    식당·카페
                    <span class="ml-1 text-body-sm">
                      (2)
                    </span>
                  </a>

                  <a class="border px-4 py-2 text-body-sm transition-colors
                     ${activeCategory eq 'shop'
                       ? 'border-primary bg-primary text-on-primary'
                       : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'}"
                     href="${ctx}/patient/facility/external?category=shop">
                    매장
                    <span class="ml-1 text-body-sm">
                      (2)
                    </span>
                  </a>

                  <a class="border px-4 py-2 text-body-sm transition-colors
                     ${activeCategory eq 'pharmacy'
                       ? 'border-primary bg-primary text-on-primary'
                       : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'}"
                     href="${ctx}/patient/facility/external?category=pharmacy">
                    약국
                    <span class="ml-1 text-body-sm">
                      (1)
                    </span>
                  </a>

                  <a class="border px-4 py-2 text-body-sm transition-colors
                     ${activeCategory eq 'bank'
                       ? 'border-primary bg-primary text-on-primary'
                       : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'}"
                     href="${ctx}/patient/facility/external?category=bank">
                    은행
                    <span class="ml-1 text-body-sm">
                      (1)
                    </span>
                  </a>

                  <a class="border px-4 py-2 text-body-sm transition-colors
                     ${activeCategory eq 'parking'
                       ? 'border-primary bg-primary text-on-primary'
                       : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'}"
                     href="${ctx}/patient/facility/external?category=parking">
                    주차
                    <span class="ml-1 text-body-sm">
                      (1)
                    </span>
                  </a>

                </div>

                <div>

                  <label class="mb-2 block text-body-sm font-semibold text-ink-black"
                         for="facilitySearch">
                    시설명 검색
                  </label>

                  <input id="facilitySearch"
                         class="w-full border border-hairline px-4 py-3 text-body-md text-ink-black outline-none focus:border-primary"
                         type="search"
                         placeholder="시설명, 종류 또는 지역을 입력하세요."
                         autocomplete="off" />

                </div>

              </div>

            </div>

            <div id="facilityList"
                 class="space-y-4 p-6 md:p-8">

              <c:if test="${activeCategory eq 'all' or activeCategory eq 'food'}">

                <article class="border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary md:p-6"
                         data-facility-card
                         data-search="정부청사역 인근 식당가 식당 카페 한식 분식 면류 둔산동">

                  <div class="flex gap-4">

                    <div class="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
                      🍽
                    </div>

                    <div class="min-w-0 flex-1">

                      <div class="mb-2 flex flex-wrap items-center gap-2">

                        <h3 class="font-title text-title text-ink-black">
                          정부청사역 인근 식당가
                        </h3>

                        <span class="border border-primary px-2 py-0.5 text-eyebrow text-primary">
                          식당·카페
                        </span>

                        <span class="text-body-sm text-ink-muted">
                          정부청사역 방면
                        </span>

                      </div>

                      <dl class="space-y-2 text-body-sm">

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            병원에서
                          </dt>

                          <dd class="text-ink-secondary">
                            도보 약 5~10분
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            운영시간
                          </dt>

                          <dd class="text-ink-secondary">
                            매장별 상이
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            위치
                          </dt>

                          <dd class="text-ink-secondary">
                            정부청사역·둔산동 상권
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            주요 메뉴
                          </dt>

                          <dd class="text-ink-secondary">
                            한식, 분식, 면류, 간편식
                          </dd>

                        </div>

                      </dl>

                      <ul class="mt-3 space-y-1 border-t border-hairline pt-3 text-body-sm text-ink-muted">

                        <li>
                          ※ 점심시간에는 일부 매장이 혼잡할 수 있습니다.
                        </li>

                        <li>
                          ※ 최신 영업정보는 카카오맵에서 확인해 주세요.
                        </li>

                      </ul>

                    </div>

                  </div>

                </article>

                <article class="border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary md:p-6"
                         data-facility-card
                         data-search="둔산동 카페 베이커리 커피 디저트 한밭대로">

                  <div class="flex gap-4">

                    <div class="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
                      ☕
                    </div>

                    <div class="min-w-0 flex-1">

                      <div class="mb-2 flex flex-wrap items-center gap-2">

                        <h3 class="font-title text-title text-ink-black">
                          둔산동 카페·베이커리
                        </h3>

                        <span class="border border-primary px-2 py-0.5 text-eyebrow text-primary">
                          식당·카페
                        </span>

                        <span class="text-body-sm text-ink-muted">
                          한밭대로 인근
                        </span>

                      </div>

                      <dl class="space-y-2 text-body-sm">

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            병원에서
                          </dt>

                          <dd class="text-ink-secondary">
                            도보 약 3~10분
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            운영시간
                          </dt>

                          <dd class="text-ink-secondary">
                            매장별 상이
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            위치
                          </dt>

                          <dd class="text-ink-secondary">
                            한밭대로·둔산동 상가 일대
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            주요 메뉴
                          </dt>

                          <dd class="text-ink-secondary">
                            커피, 음료, 베이커리, 디저트
                          </dd>

                        </div>

                      </dl>

                    </div>

                  </div>

                </article>

              </c:if>

              <c:if test="${activeCategory eq 'all' or activeCategory eq 'shop'}">

                <article class="border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary md:p-6"
                         data-facility-card
                         data-search="인근 편의점 매장 음료 간식 도시락 일용잡화 정부청사역">

                  <div class="flex gap-4">

                    <div class="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
                      🏪
                    </div>

                    <div class="min-w-0 flex-1">

                      <div class="mb-2 flex flex-wrap items-center gap-2">

                        <h3 class="font-title text-title text-ink-black">
                          인근 편의점
                        </h3>

                        <span class="border border-primary px-2 py-0.5 text-eyebrow text-primary">
                          매장
                        </span>

                        <span class="text-body-sm text-ink-muted">
                          정부청사역 방면
                        </span>

                      </div>

                      <dl class="space-y-2 text-body-sm">

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            병원에서
                          </dt>

                          <dd class="text-ink-secondary">
                            도보 약 3~7분
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            운영시간
                          </dt>

                          <dd class="text-ink-secondary">
                            매장별 상이하며 일부 매장은 24시간 운영
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            위치
                          </dt>

                          <dd class="text-ink-secondary">
                            정부청사역·한밭대로 인근
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            취급품목
                          </dt>

                          <dd class="text-ink-secondary">
                            음료, 간식, 도시락, 일용잡화
                          </dd>

                        </div>

                      </dl>

                    </div>

                  </div>

                </article>

                <article class="border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary md:p-6"
                         data-facility-card
                         data-search="의료 재활용품점 의료기기 보조기구 목 허리 지팡이 둔산동">

                  <div class="flex gap-4">

                    <div class="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
                      🩺
                    </div>

                    <div class="min-w-0 flex-1">

                      <div class="mb-2 flex flex-wrap items-center gap-2">

                        <h3 class="font-title text-title text-ink-black">
                          의료·재활용품점
                        </h3>

                        <span class="border border-primary px-2 py-0.5 text-eyebrow text-primary">
                          매장
                        </span>

                        <span class="text-body-sm text-ink-muted">
                          둔산동 상권
                        </span>

                      </div>

                      <dl class="space-y-2 text-body-sm">

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            병원에서
                          </dt>

                          <dd class="text-ink-secondary">
                            도보 또는 차량 이동
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            운영시간
                          </dt>

                          <dd class="text-ink-secondary">
                            매장별 상이
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            위치
                          </dt>

                          <dd class="text-ink-secondary">
                            둔산동 의료상가 일대
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            취급품목
                          </dt>

                          <dd class="text-ink-secondary">
                            목·허리 보조기, 지팡이, 보호대, 재활용품
                          </dd>

                        </div>

                      </dl>

                      <ul class="mt-3 space-y-1 border-t border-hairline pt-3 text-body-sm text-ink-muted">

                        <li>
                          ※ 의료용품 구매 전 의료진과 상담하는 것을 권장합니다.
                        </li>

                      </ul>

                    </div>

                  </div>

                </article>

              </c:if>

              <c:if test="${activeCategory eq 'all' or activeCategory eq 'pharmacy'}">

                <article class="border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary md:p-6"
                         data-facility-card
                         data-search="정부청사역 인근 약국 처방전 일반의약품 의약외품 둔산동">

                  <div class="flex gap-4">

                    <div class="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
                      💊
                    </div>

                    <div class="min-w-0 flex-1">

                      <div class="mb-2 flex flex-wrap items-center gap-2">

                        <h3 class="font-title text-title text-ink-black">
                          정부청사역 인근 약국
                        </h3>

                        <span class="border border-primary px-2 py-0.5 text-eyebrow text-primary">
                          약국
                        </span>

                        <span class="text-body-sm text-ink-muted">
                          정부청사역·둔산동
                        </span>

                      </div>

                      <dl class="space-y-2 text-body-sm">

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            병원에서
                          </dt>

                          <dd class="text-ink-secondary">
                            도보 약 5~10분
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            운영시간
                          </dt>

                          <dd class="text-ink-secondary">
                            약국별 상이
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            위치
                          </dt>

                          <dd class="text-ink-secondary">
                            정부청사역·둔산동 상권
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            취급품목
                          </dt>

                          <dd class="text-ink-secondary">
                            처방전 조제, 일반의약품, 의약외품
                          </dd>

                        </div>

                      </dl>

                      <ul class="mt-3 space-y-1 border-t border-hairline pt-3 text-body-sm text-ink-muted">

                        <li>
                          ※ 처방전 조제와 영업시간은 해당 약국에 확인해 주세요.
                        </li>

                      </ul>

                    </div>

                  </div>

                </article>

              </c:if>

              <c:if test="${activeCategory eq 'all' or activeCategory eq 'bank'}">

                <article class="border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary md:p-6"
                         data-facility-card
                         data-search="정부청사역 은행 ATM 금융 둔산동 현금자동입출금기">

                  <div class="flex gap-4">

                    <div class="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
                      🏦
                    </div>

                    <div class="min-w-0 flex-1">

                      <div class="mb-2 flex flex-wrap items-center gap-2">

                        <h3 class="font-title text-title text-ink-black">
                          정부청사역 인근 은행·ATM
                        </h3>

                        <span class="border border-primary px-2 py-0.5 text-eyebrow text-primary">
                          은행
                        </span>

                        <span class="text-body-sm text-ink-muted">
                          둔산동 금융상권
                        </span>

                      </div>

                      <dl class="space-y-2 text-body-sm">

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            병원에서
                          </dt>

                          <dd class="text-ink-secondary">
                            도보 약 5~10분
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            은행 영업시간
                          </dt>

                          <dd class="text-ink-secondary">
                            일반적으로 평일 09:00 ~ 16:00
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            위치
                          </dt>

                          <dd class="text-ink-secondary">
                            정부청사역·둔산동 상가 일대
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            이용 안내
                          </dt>

                          <dd class="text-ink-secondary">
                            은행 지점 및 편의점 ATM 이용 가능
                          </dd>

                        </div>

                      </dl>

                    </div>

                  </div>

                </article>

              </c:if>

              <c:if test="${activeCategory eq 'all' or activeCategory eq 'parking'}">

                <article class="border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary md:p-6"
                         data-facility-card
                         data-search="둔산동 인근 주차장 공영주차장 민영주차장 정부청사역">

                  <div class="flex gap-4">

                    <div class="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
                      🅿
                    </div>

                    <div class="min-w-0 flex-1">

                      <div class="mb-2 flex flex-wrap items-center gap-2">

                        <h3 class="font-title text-title text-ink-black">
                          둔산동 인근 주차장
                        </h3>

                        <span class="border border-primary px-2 py-0.5 text-eyebrow text-primary">
                          주차
                        </span>

                        <span class="text-body-sm text-ink-muted">
                          정부청사역·둔산동
                        </span>

                      </div>

                      <dl class="space-y-2 text-body-sm">

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            병원에서
                          </dt>

                          <dd class="text-ink-secondary">
                            도보 약 5~15분
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            운영시간
                          </dt>

                          <dd class="text-ink-secondary">
                            주차장별 상이
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            위치
                          </dt>

                          <dd class="text-ink-secondary">
                            정부청사역·둔산동 인근 공영 및 민영주차장
                          </dd>

                        </div>

                        <div class="flex gap-2">

                          <dt class="shrink-0 font-semibold text-ink-black">
                            요금
                          </dt>

                          <dd class="text-ink-secondary">
                            주차장별 요금과 할인 기준 상이
                          </dd>

                        </div>

                      </dl>

                      <ul class="mt-3 space-y-1 border-t border-hairline pt-3 text-body-sm text-ink-muted">

                        <li>
                          ※ 병원 주차장 만차 시 인근 주차장을 이용해 주세요.
                        </li>

                        <li>
                          ※ 정확한 위치와 요금은 카카오맵에서 확인해 주세요.
                        </li>

                      </ul>

                    </div>

                  </div>

                </article>

              </c:if>

              <div id="facilityEmpty"
                   class="hidden border border-hairline bg-surface-container-low px-6 py-12 text-center">

                <p class="text-body-md text-ink-secondary">
                  검색 조건과 일치하는 편의시설이 없습니다.
                </p>

              </div>

            </div>

          </section>

          <section class="border border-hairline bg-canvas-white">

            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">

              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                이용 안내
              </h2>

            </div>

            <div class="p-6 md:p-8">

              <ul class="space-y-3">

                <li class="flex gap-2 text-body-md text-ink-secondary">

                  <span class="mt-1 shrink-0 text-primary">
                    ⓘ
                  </span>

                  외부 시설 정보는 참고용이며,
                  운영시간과 영업 여부는 방문 전 확인해 주세요.

                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">

                  <span class="mt-1 shrink-0 text-primary">
                    ⓘ
                  </span>

                  안내된 외부 시설은 병원과 제휴 또는 운영 관계가 없는
                  민간 시설입니다.

                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">

                  <span class="mt-1 shrink-0 text-primary">
                    ⓘ
                  </span>

                  실시간 위치와 운영정보는 카카오맵을 통해 확인해 주세요.

                </li>

              </ul>

            </div>

          </section>

        </div>

        <aside class="h-fit space-y-gutter lg:sticky lg:top-28">

          <div class="border border-hairline bg-canvas-white p-6 md:p-8">

            <h2 class="mb-4 font-headline-2 text-headline-2 text-ink-black">
              지역별 안내
            </h2>

            <div class="space-y-5">

              <div>

                <h3 class="mb-1 font-title text-title text-ink-black">
                  한밭대로 인근
                </h3>

                <p class="mb-2 text-body-sm text-ink-muted">
                  병원 주변 도보 약 1~5분
                </p>

                <ul class="space-y-1 text-body-sm text-ink-secondary">

                  <li>
                    · 카페·베이커리
                  </li>

                  <li>
                    · 편의점
                  </li>

                  <li>
                    · 간편식 매장
                  </li>

                </ul>

              </div>

              <div>

                <h3 class="mb-1 font-title text-title text-ink-black">
                  정부청사역 방면
                </h3>

                <p class="mb-2 text-body-sm text-ink-muted">
                  병원에서 도보 약 5~10분
                </p>

                <ul class="space-y-1 text-body-sm text-ink-secondary">

                  <li>
                    · 식당가
                  </li>

                  <li>
                    · 약국
                  </li>

                  <li>
                    · 은행·ATM
                  </li>

                </ul>

              </div>

              <div>

                <h3 class="mb-1 font-title text-title text-ink-black">
                  둔산동 상권
                </h3>

                <p class="mb-2 text-body-sm text-ink-muted">
                  도보 또는 차량 이동
                </p>

                <ul class="space-y-1 text-body-sm text-ink-secondary">

                  <li>
                    · 음식점·카페
                  </li>

                  <li>
                    · 의료·재활용품점
                  </li>

                  <li>
                    · 공영·민영주차장
                  </li>

                </ul>

              </div>

            </div>

          </div>

          <div class="divide-y divide-hairline border border-hairline bg-canvas-white">

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/facility/internal">

              <span class="flex items-center gap-2">

                <span class="text-primary">
                  🏥
                </span>

                원내 편의시설

              </span>

              <span class="text-primary">
                &gt;
              </span>

            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/directions">

              <span class="flex items-center gap-2">

                <span class="text-primary">
                  📍
                </span>

                오시는길

              </span>

              <span class="text-primary">
                &gt;
              </span>

            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="https://map.kakao.com/link/search/대전광역시%20서구%20한밭대로%20755"
               target="_blank"
               rel="noopener noreferrer">

              <span class="flex items-center gap-2">

                <span class="text-primary">
                  🗺
                </span>

                카카오맵

              </span>

              <span class="text-primary">
                &gt;
              </span>

            </a>

          </div>

          <div class="border border-hairline bg-canvas-white p-6 md:p-8">

            <h2 class="mb-4 font-headline-2 text-headline-2 text-ink-black">
              문의
            </h2>

            <ul class="space-y-4 text-body-sm text-ink-secondary">

              <li class="flex gap-3">

                <span class="shrink-0 text-primary">
                  ☎
                </span>

                <div>

                  <p class="font-semibold text-ink-black">
                    병원 안내
                  </p>

                  <p class="mt-1">
                    1588-1234
                  </p>

                </div>

              </li>

              <li class="flex gap-3">

                <span class="shrink-0 text-primary">
                  📍
                </span>

                <div>

                  <p class="font-semibold text-ink-black">
                    병원 주소
                  </p>

                  <p class="mt-1">
                    대전광역시 서구 한밭대로 755
                  </p>

                </div>

              </li>

            </ul>

          </div>

        </aside>

      </div>

    </div>

  </main>

  <jsp:include page="/WEB-INF/views/patient/common/footer.jsp" />

</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const searchInput =
      document.getElementById("facilitySearch");

    const facilityCards =
      document.querySelectorAll("[data-facility-card]");

    const emptyMessage =
      document.getElementById("facilityEmpty");

    if (!searchInput) {
      return;
    }

    searchInput.addEventListener("input", function () {
      const keyword =
        searchInput.value.trim().toLowerCase();

      let visibleCount = 0;

      facilityCards.forEach(function (card) {
        const searchableText =
          (card.getAttribute("data-search") || "")
            .toLowerCase();

        const isVisible =
          keyword === ""
          || searchableText.includes(keyword);

        card.classList.toggle(
          "hidden",
          !isVisible
        );

        if (isVisible) {
          visibleCount += 1;
        }
      });

      if (emptyMessage) {
        emptyMessage.classList.toggle(
          "hidden",
          visibleCount > 0
        );
      }
    });
  });
</script>

</body>
</html>