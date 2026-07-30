<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8" />

  <meta name="viewport"
        content="width=device-width, initial-scale=1.0" />

  <title>자주 묻는 질문 | MediBridge</title>

  <link rel="stylesheet"
        href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>

<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <%@ include file="../common/header.jsp" %>

  <main class="flex-1 py-12 md:py-16">

    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">

        <p class="font-eyebrow text-eyebrow text-primary">
          CUSTOMER CENTER
        </p>

        <h1 class="mt-2 font-headline-1 text-headline-1 font-bold md:text-display-1">
          자주 묻는 질문
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          진료 예약, 병원 이용, 증명서 발급 등 자주 문의하시는 내용을 확인할 수 있습니다.
        </p>

      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <!-- FAQ 목록 -->
        <div class="space-y-gutter lg:col-span-2">

          <section class="border border-hairline bg-canvas-white">

            <!-- 검색 및 메뉴 -->
            <div class="border-b border-hairline bg-surface-container-low p-4 md:p-6">

              <div class="flex flex-col gap-4">

                <div class="flex flex-wrap gap-2">

                  <a class="border border-primary bg-primary px-4 py-2 text-body-sm text-on-primary transition-colors"
                     href="${ctx}/patient/faq/list">
                    전체
                  </a>

                  <a class="border border-hairline bg-canvas-white px-4 py-2 text-body-sm text-ink-black transition-colors hover:border-primary hover:text-primary"
                     href="${ctx}/patient/qna/list">
                    문의 내역
                  </a>

                  <a class="border border-hairline bg-canvas-white px-4 py-2 text-body-sm text-ink-black transition-colors hover:border-primary hover:text-primary"
                     href="${ctx}/patient/qna/form">
                    문의하기
                  </a>

                </div>

                <form action="${ctx}/patient/faq/list"
                      method="get"
                      style="display: flex;
                             align-items: center;
                             gap: 8px;
                             width: 100%;">

                  <label for="faqKeyword"
                         style="display: none;">
                    FAQ 검색
                  </label>

                  <input id="faqKeyword"
                         type="search"
                         name="keyword"
                         value="${keyword}"
                         placeholder="궁금한 내용을 검색해 보세요."
                         class="border border-hairline bg-canvas-white px-4 py-3 text-body-md text-ink-black outline-none focus:border-primary"
                         style="flex: 1;
                                min-width: 0;" />

                  <button type="submit"
                          class="border border-primary bg-primary px-5 py-3 text-body-sm text-on-primary hover:bg-tertiary"
                          style="min-width: 64px;
                                 white-space: nowrap;">
                    검색
                  </button>

                </form>

                <c:if test="${not empty keyword}">

                  <p class="text-body-sm text-ink-secondary">

                    '<c:out value="${keyword}" />' 검색 결과:

                    <span class="font-semibold text-primary">
                      ${totalCount}
                    </span>건

                  </p>

                </c:if>

              </div>

            </div>

            <!-- FAQ 목록 -->
            <div id="faqListArea">

              <c:choose>

                <c:when test="${empty faqList}">

                  <div class="px-6 py-16 text-center md:px-8">

                    <h2 class="font-headline-2 text-headline-2 text-ink-black">

                      <c:choose>

                        <c:when test="${not empty keyword}">
                          검색 결과가 없습니다.
                        </c:when>

                        <c:otherwise>
                          등록된 FAQ가 없습니다.
                        </c:otherwise>

                      </c:choose>

                    </h2>

                    <p class="mt-3 text-body-md text-ink-secondary">
                      궁금한 내용은 문의하기를 통해 남겨주세요.
                    </p>

                    <div class="mt-6">

                      <a class="inline-flex items-center border border-primary bg-primary px-5 py-3 text-body-sm text-on-primary hover:bg-tertiary"
                         href="${ctx}/patient/qna/form">
                        문의하기
                      </a>

                    </div>

                  </div>

                </c:when>

                <c:otherwise>

                  <c:forEach var="faq"
                             items="${faqList}"
                             varStatus="status">

                    <article class="border-b border-hairline last:border-b-0"
                             data-faq-item>

                      <button class="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface-container-low md:px-8"
                              type="button"
                              data-faq-toggle="faq-${status.index}">

                        <span class="text-body-md font-semibold text-ink-black">

                          <span class="mr-2 text-primary">
                            Q.
                          </span>

                          <c:out value="${faq.faqQuestion}" />

                        </span>

                        <span class="shrink-0 text-ink-secondary"
                              data-faq-icon>
                          +
                        </span>

                      </button>

                      <div id="faq-${status.index}"
                           class="hidden border-t border-hairline bg-surface-container-low px-6 py-4 md:px-8">

                        <div class="mb-3">

                          <span class="inline-block border border-hairline bg-canvas-white px-2 py-1 text-eyebrow text-ink-secondary">

                            <c:out value="${faq.faqCategory}"
                                   default="FAQ" />

                          </span>

                        </div>

                        <div class="flex items-start gap-3">

                          <span class="shrink-0 pt-0.5 font-semibold text-primary">
                            A.
                          </span>

                          <p class="min-w-0 whitespace-pre-wrap break-words text-body-md leading-7 text-ink-secondary"><c:out value="${faq.faqAnswer}" default="등록된 답변이 없습니다." /></p>

                        </div>

                      </div>

                    </article>

                  </c:forEach>

                </c:otherwise>

              </c:choose>

            </div>

            <!-- 페이징 -->
            <c:if test="${totalPage > 1}">

              <div class="flex items-center justify-center gap-2 border-t border-hairline px-6 py-6">

                <c:if test="${startPage > 1}">

                  <c:url var="prevUrl"
                         value="/patient/faq/list">

                    <c:param name="page"
                             value="${startPage - 1}" />

                    <c:if test="${not empty keyword}">

                      <c:param name="keyword"
                               value="${keyword}" />

                    </c:if>

                  </c:url>

                  <a class="border border-hairline bg-canvas-white px-3 py-2 text-body-sm text-ink-black hover:border-primary hover:text-primary"
                     href="${prevUrl}">
                    이전
                  </a>

                </c:if>

                <c:forEach var="i"
                           begin="${startPage}"
                           end="${endPage}">

                  <c:url var="pageUrl"
                         value="/patient/faq/list">

                    <c:param name="page"
                             value="${i}" />

                    <c:if test="${not empty keyword}">

                      <c:param name="keyword"
                               value="${keyword}" />

                    </c:if>

                  </c:url>

                  <a href="${pageUrl}"
                     class="${page == i
                       ? 'border border-primary bg-primary px-3 py-2 text-body-sm text-on-primary'
                       : 'border border-hairline bg-canvas-white px-3 py-2 text-body-sm text-ink-black hover:border-primary hover:text-primary'}">
                    ${i}
                  </a>

                </c:forEach>

                <c:if test="${endPage < totalPage}">

                  <c:url var="nextUrl"
                         value="/patient/faq/list">

                    <c:param name="page"
                             value="${endPage + 1}" />

                    <c:if test="${not empty keyword}">

                      <c:param name="keyword"
                               value="${keyword}" />

                    </c:if>

                  </c:url>

                  <a class="border border-hairline bg-canvas-white px-3 py-2 text-body-sm text-ink-black hover:border-primary hover:text-primary"
                     href="${nextUrl}">
                    다음
                  </a>

                </c:if>

              </div>

            </c:if>

          </section>

        </div>

        <!-- 우측 고객센터 -->
        <aside class="h-fit space-y-gutter lg:sticky lg:top-28">

          <div class="border border-hairline bg-canvas-white p-6 md:p-8">

            <h2 class="mb-4 font-headline-2 text-headline-2 text-ink-black">
              고객센터
            </h2>

            <ul class="space-y-4 text-body-sm text-ink-secondary">

              <li class="flex gap-3">

                <span class="shrink-0 text-primary">
                  ☎
                </span>

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

                <span class="shrink-0 text-primary">
                  ⏰
                </span>

                <div>

                  <p class="font-semibold text-ink-black">
                    상담 시간
                  </p>

                  <p class="mt-1">
                    평일 09:00 ~ 18:00
                  </p>

                </div>

              </li>

            </ul>

          </div>

          <div class="divide-y divide-hairline border border-hairline bg-canvas-white">

            <a class="flex items-center justify-between bg-surface-container-low px-4 py-3 text-body-md font-semibold text-primary transition-colors md:px-6 md:py-4"
               href="${ctx}/patient/faq/list">

              <span>자주 묻는 질문</span>
              <span>&gt;</span>

            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/qna/list">

              <span>문의 내역</span>
              <span class="text-primary">&gt;</span>

            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/qna/form">

              <span>문의하기</span>
              <span class="text-primary">&gt;</span>

            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/notice/list">

              <span>공지사항</span>
              <span class="text-primary">&gt;</span>

            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/reservation/form">

              <span>진료 예약</span>
              <span class="text-primary">&gt;</span>

            </a>

          </div>

        </aside>

      </div>

    </div>

  </main>

  <%@ include file="../common/footer.jsp" %>

</div>

<script>
  const faqButtons =
      document.querySelectorAll('[data-faq-toggle]');

  faqButtons.forEach(function (button) {

    button.addEventListener('click', function () {

      const targetId =
          button.getAttribute('data-faq-toggle');

      const target =
          document.getElementById(targetId);

      const icon =
          button.querySelector('[data-faq-icon]');

      if (!target) {
        return;
      }

      const isHidden =
          target.classList.contains('hidden');

      target.classList.toggle('hidden');

      if (icon) {
        icon.textContent =
            isHidden ? '-' : '+';
      }

    });

  });
</script>

</body>
</html>