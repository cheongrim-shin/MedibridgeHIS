<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<c:if test="${empty activeCategory}">
  <c:set var="activeCategory" value="all" />
</c:if>

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>비급여 진료비용 | MediBridge</title>
  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">
        <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
          비급여 진료비용
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          MediBridge 재활정형외과 비급여 진료비용 안내입니다.
        </p>

        <p class="mt-2 text-body-md text-ink-secondary">
          아래 금액은 참고용이며, 진료·치료 내용과 환자 상태에 따라 달라질 수 있습니다.
          정확한 비용은 내원 시 안내해 드립니다.
        </p>
      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <div class="space-y-gutter lg:col-span-2">

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                비급여 항목 조회
              </h2>
            </div>

            <div class="p-6 md:p-8">

              <div class="mb-6">

                <form action="${ctx}/patient/fees/non-covered" method="get" class="mb-4">
                  <input type="hidden" name="category" value="${activeCategory}" />

                  <label class="mb-2 block text-body-sm font-semibold text-ink-black">
                    항목명 검색
                  </label>

                  <div class="flex flex-col gap-2 md:flex-row">
                    <input class="w-full border border-hairline px-4 py-3 text-body-md text-ink-black outline-none focus:border-primary"
                           type="search"
                           name="keyword"
                           value="${keyword}"
                           placeholder="항목명을 입력하세요." />

                    <button class="shrink-0 border border-primary bg-primary px-5 py-3 text-body-md text-on-primary"
                            type="submit">
                      검색
                    </button>
                  </div>
                </form>

                <div class="flex flex-wrap gap-2">
                  <a class="shrink-0 border px-3 py-2 text-body-sm transition-colors
                     ${activeCategory eq 'all' ? 'border-primary bg-primary text-on-primary' : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'}"
                     href="${ctx}/patient/fees/non-covered?category=all">
                    전체
                  </a>

                  <a class="shrink-0 border px-3 py-2 text-body-sm transition-colors
                     ${activeCategory eq 'imaging' ? 'border-primary bg-primary text-on-primary' : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'}"
                     href="${ctx}/patient/fees/non-covered?category=imaging">
                    영상·검사
                  </a>

                  <a class="shrink-0 border px-3 py-2 text-body-sm transition-colors
                     ${activeCategory eq 'rehabilitation' ? 'border-primary bg-primary text-on-primary' : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'}"
                     href="${ctx}/patient/fees/non-covered?category=rehabilitation">
                    재활치료
                  </a>
                </div>

                <p class="mt-4 text-body-sm text-ink-secondary">
                  COMMONCODE 기준 영상검사(M), 물리치료(P) 항목을 조회합니다.
                </p>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full min-w-[720px] border-collapse">
                  <thead>
                    <tr class="bg-surface-container-low">
                      <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        분류
                      </th>

                      <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        항목
                      </th>

                      <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        세부
                      </th>

                      <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        비용
                      </th>

                      <th class="border border-hairline px-4 py-3 text-center text-body-sm font-semibold text-ink-black">
                        소요시간
                      </th>

                      <th class="border border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                        비고
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <c:choose>

                      <c:when test="${empty feeList}">
                        <tr>
                          <td colspan="6" class="px-4 py-16 text-center text-body-md text-ink-secondary">
                            조회된 비급여 항목이 없습니다.
                          </td>
                        </tr>
                      </c:when>

                      <c:otherwise>
                        <c:forEach var="fee" items="${feeList}">
                          <tr class="hover:bg-surface-container-low">

                            <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                              <c:out value="${fee.groupName}" default="분류 미정" />
                            </td>

                            <td class="border border-hairline px-4 py-3 text-body-md text-ink-black">
                              <c:out value="${fee.itemName}" default="항목명 미등록" />
                            </td>

                            <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                              <c:out value="${fee.itemDetail}" default="-" />
                            </td>

                            <td class="border border-hairline px-4 py-3 text-body-sm text-ink-black">
                              <c:choose>
                                <c:when test="${not empty fee.unitPrice}">
                                  <fmt:formatNumber value="${fee.unitPrice}" pattern="#,###" />원
                                </c:when>
                                <c:otherwise>
                                  문의
                                </c:otherwise>
                              </c:choose>
                            </td>

                            <td class="border border-hairline px-4 py-3 text-center text-body-sm text-ink-secondary">
                              <c:choose>
                                <c:when test="${not empty fee.durationMin}">
                                  ${fee.durationMin}분
                                </c:when>
                                <c:otherwise>
                                  -
                                </c:otherwise>
                              </c:choose>
                            </td>

                            <td class="border border-hairline px-4 py-3 text-body-sm text-ink-secondary">
                              <c:choose>
                                <c:when test="${fee.coverageYn eq 'Y'}">
                                  급여 여부 확인 필요
                                </c:when>
                                <c:when test="${fee.coverageYn eq 'N'}">
                                  비급여
                                </c:when>
                                <c:otherwise>
                                  비용은 내원 시 확인
                                </c:otherwise>
                              </c:choose>
                            </td>

                          </tr>
                        </c:forEach>
                      </c:otherwise>

                    </c:choose>
                  </tbody>
                </table>
              </div>

            </div>
          </section>

          <section class="border border-hairline bg-canvas-white">
            <div class="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                비급여 안내사항
              </h2>
            </div>

            <div class="p-6 md:p-8">
              <ul class="space-y-3">
                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  비급여 항목은 건강보험 적용 대상이 아니며, 환자 본인 부담입니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  동일 항목이라도 시술·치료 범위, 사용 재료에 따라 비용이 달라질 수 있습니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  입원료에는 식대·간병비 등이 포함되지 않을 수 있습니다.
                </li>

                <li class="flex gap-2 text-body-md text-ink-secondary">
                  <span class="mt-1 shrink-0 text-primary">ⓘ</span>
                  비급여 항목 시행 전 의료진 설명과 동의 절차를 거칩니다.
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