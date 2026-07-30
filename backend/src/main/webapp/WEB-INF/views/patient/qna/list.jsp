<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8" />

  <meta name="viewport"
        content="width=device-width, initial-scale=1.0" />

  <title>문의 내역 | MediBridge</title>

  <link rel="stylesheet"
        href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>

<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">

    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">

        <p class="font-eyebrow text-eyebrow text-primary">
          CUSTOMER CENTER
        </p>

        <div class="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>

            <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
              문의 내역
            </h1>

            <p class="mt-3 text-body-md text-ink-secondary">
              진료, 예약, 병원 이용과 관련해 등록한 문의와 답변 상태를 확인할 수 있습니다.
            </p>

          </div>

          <a href="${ctx}/patient/qna/form"
             class="inline-flex items-center justify-center bg-primary px-5 py-3 text-body-sm font-semibold text-on-primary hover:bg-tertiary">
            문의하기
          </a>

        </div>

      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <div class="space-y-gutter lg:col-span-2">

          <section class="border border-hairline bg-canvas-white">

            <div class="border-b border-hairline bg-surface-container-low p-4 md:p-6">

              <div class="flex flex-wrap gap-2">

                <a class="border border-hairline bg-canvas-white px-4 py-2 text-body-sm text-ink-black transition-colors hover:border-primary hover:text-primary"
                   href="${ctx}/patient/faq/list">
                  자주 묻는 질문
                </a>

                <a class="border border-primary bg-primary px-4 py-2 text-body-sm text-on-primary transition-colors"
                   href="${ctx}/patient/qna/list">
                  문의 내역
                </a>

                <a class="border border-hairline bg-canvas-white px-4 py-2 text-body-sm text-ink-black transition-colors hover:border-primary hover:text-primary"
                   href="${ctx}/patient/qna/form">
                  문의하기
                </a>

              </div>

            </div>

            <div>

              <c:choose>

                <c:when test="${empty qnaList}">

                  <div class="px-6 py-16 text-center md:px-8">

                    <h2 class="font-headline-2 text-headline-2 text-ink-black">
                      등록된 문의가 없습니다.
                    </h2>

                    <p class="mt-3 text-body-md text-ink-secondary">
                      궁금한 내용이 있다면 문의하기를 통해 남겨주세요.
                    </p>

                    <div class="mt-6 flex justify-center gap-3">

                      <a class="inline-flex items-center border border-primary bg-primary px-5 py-3 text-body-sm text-on-primary hover:bg-tertiary"
                         href="${ctx}/patient/qna/form">
                        문의하기
                      </a>

                      <a class="inline-flex items-center border border-hairline bg-canvas-white px-5 py-3 text-body-sm text-ink-black hover:border-primary hover:text-primary"
                         href="${ctx}/patient/faq/list">
                        FAQ 보기
                      </a>

                    </div>

                  </div>

                </c:when>

                <c:otherwise>

                  <div class="divide-y divide-hairline">

                    <c:forEach var="qna"
                               items="${qnaList}">

                      <article class="p-6 transition-colors hover:bg-surface-container-low md:p-8">

                        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                          <div class="min-w-0 flex-1">

                            <div class="mb-3 flex flex-wrap items-center gap-2">

                              <%--
                                기본값으로 코드 자체를 보관한다.

                                공용코드 목록에서 일치하는 코드가 있으면
                                화면 표시값을 코드명으로 변경한다.
                              --%>
                              <c:set var="categoryName"
                                     value="${qna.categoryCode}" />

                              <c:forEach var="category"
                                         items="${qnaCategoryList}">

                                <c:if test="${category.commonCodeNumber eq qna.categoryCode}">

                                  <c:set var="categoryName"
                                         value="${category.codeName}" />

                                </c:if>

                              </c:forEach>

                              <span class="inline-flex items-center border border-hairline bg-canvas-white px-2 py-1 font-eyebrow text-eyebrow text-ink-secondary">

                                <c:out value="${categoryName}"
                                       default="문의" />

                              </span>

                              <span class="inline-flex items-center border border-hairline px-2 py-1 font-eyebrow text-eyebrow text-ink-secondary">

                                <c:out value="${qna.status}"
                                       default="상태 확인중" />

                              </span>

                              <span class="font-eyebrow text-eyebrow text-ink-muted">

                                <c:out value="${qna.qandaNumber}" />

                              </span>

                            </div>

                            <h2 class="font-headline-2 text-headline-2 text-ink-black">

                              <a href="${ctx}/patient/qna/detail?qandaNumber=${qna.qandaNumber}"
                                 class="hover:text-primary">

                                <c:out value="${qna.subject}" />

                              </a>

                            </h2>

                            <div class="mt-3 text-body-sm text-ink-secondary"
                                 style="display:flex; flex-wrap:wrap; column-gap:1.5rem; row-gap:0.25rem;">

                              <span>
                                작성자:
                                <c:out value="${qna.inquirer}"
                                       default="-" />
                              </span>

                              <span>
                                작성일:
                                <c:out value="${qna.dateWritten}"
                                       default="-" />
                              </span>

                            </div>

                          </div>

                          <div class="shrink-0">

                            <a href="${ctx}/patient/qna/detail?qandaNumber=${qna.qandaNumber}"
                               class="inline-flex items-center border border-primary bg-primary px-5 py-3 text-body-sm text-on-primary hover:bg-tertiary">
                              상세보기
                            </a>

                          </div>

                        </div>

                      </article>

                    </c:forEach>

                  </div>

                </c:otherwise>

              </c:choose>

            </div>

          </section>

        </div>

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

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/faq/list">

              <span>자주 묻는 질문</span>
              <span class="text-primary">&gt;</span>

            </a>

            <a class="flex items-center justify-between bg-surface-container-low px-4 py-3 text-body-md font-semibold text-primary transition-colors md:px-6 md:py-4"
               href="${ctx}/patient/qna/list">

              <span>문의 내역</span>
              <span>&gt;</span>

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

  <jsp:include page="/WEB-INF/views/patient/common/footer.jsp" />

</div>

</body>
</html>