<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8" />

  <meta name="viewport"
        content="width=device-width, initial-scale=1.0" />

  <title>공지사항 | MediBridge</title>

  <link rel="stylesheet"
        href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>

<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <%@ include file="../common/header.jsp" %>

  <main class="flex-1 py-12 md:py-16">

    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">

        <h1 class="font-headline-1 text-headline-1 font-bold md:text-display-1">
          공지사항
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          병원 운영, 시설 및 시스템 관련 주요 소식을 확인하실 수 있습니다.
        </p>

      </header>

      <!-- 전체 카테고리 URL -->
      <c:url var="allUrl"
             value="/patient/notice/list">

        <c:if test="${not empty keyword}">
          <c:param name="keyword"
                   value="${keyword}" />
        </c:if>

      </c:url>

      <!-- 운영안내 카테고리 URL -->
      <c:url var="operationUrl"
             value="/patient/notice/list">

        <c:param name="category"
                 value="운영안내" />

        <c:if test="${not empty keyword}">
          <c:param name="keyword"
                   value="${keyword}" />
        </c:if>

      </c:url>

      <!-- 시설안내 카테고리 URL -->
      <c:url var="facilityUrl"
             value="/patient/notice/list">

        <c:param name="category"
                 value="시설안내" />

        <c:if test="${not empty keyword}">
          <c:param name="keyword"
                   value="${keyword}" />
        </c:if>

      </c:url>

      <!-- 시스템 카테고리 URL -->
      <c:url var="systemUrl"
             value="/patient/notice/list">

        <c:param name="category"
                 value="시스템" />

        <c:if test="${not empty keyword}">
          <c:param name="keyword"
                   value="${keyword}" />
        </c:if>

      </c:url>

      <!-- 카테고리 필터 -->
      <div class="mb-6 flex flex-wrap gap-2">

        <a class="border px-4 py-2 text-body-sm transition-colors
                  ${empty category
                    ? 'border-primary bg-primary text-white'
                    : 'border-hairline bg-canvas-white text-ink-secondary hover:border-primary hover:text-primary'}"
           href="${allUrl}">
          전체
        </a>

        <a class="border px-4 py-2 text-body-sm transition-colors
                  ${category == '운영안내'
                    ? 'border-primary bg-primary text-white'
                    : 'border-hairline bg-canvas-white text-ink-secondary hover:border-primary hover:text-primary'}"
           href="${operationUrl}">
          운영안내
        </a>

        <a class="border px-4 py-2 text-body-sm transition-colors
                  ${category == '시설안내'
                    ? 'border-primary bg-primary text-white'
                    : 'border-hairline bg-canvas-white text-ink-secondary hover:border-primary hover:text-primary'}"
           href="${facilityUrl}">
          시설안내
        </a>

        <a class="border px-4 py-2 text-body-sm transition-colors
                  ${category == '시스템'
                    ? 'border-primary bg-primary text-white'
                    : 'border-hairline bg-canvas-white text-ink-secondary hover:border-primary hover:text-primary'}"
           href="${systemUrl}">
          시스템
        </a>

      </div>

      <section class="border border-hairline bg-canvas-white">

        <!-- 목록 상단 -->
        <div class="border-b border-hairline bg-surface-container-low p-4 md:p-6">

          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <p class="text-body-md text-ink-black">

                <c:choose>

                  <c:when test="${empty category}">
                    전체 공지사항
                  </c:when>

                  <c:otherwise>
                    <c:out value="${category}" /> 공지사항
                  </c:otherwise>

                </c:choose>

              </p>

              <p class="mt-1 text-body-sm text-ink-secondary">
                메디브릿지 병원의 주요 공지사항을 확인하실 수 있습니다.
              </p>

              <c:if test="${not empty totalCount}">

                <p class="mt-1 text-body-sm text-ink-muted">
                  총 ${totalCount}건
                </p>

              </c:if>

            </div>

            <!-- 검색 -->
            <form class="w-full md:max-w-xs"
                  action="${ctx}/patient/notice/list"
                  method="get">

              <c:if test="${not empty category}">

                <input type="hidden"
                       name="category"
                       value="${category}" />

              </c:if>

              <div class="flex">

                <input class="w-full border border-hairline bg-canvas-white px-4 py-3 text-body-sm text-ink-black outline-none focus:border-primary"
                       type="search"
                       name="keyword"
                       value="${keyword}"
                       placeholder="검색어를 입력하세요." />

                <button class="border border-l-0 border-hairline bg-primary px-4 text-body-sm text-white"
                        type="submit">
                  검색
                </button>

              </div>

            </form>

          </div>

        </div>

        <!-- PC 테이블 -->
        <div class="hidden overflow-x-auto md:block">

          <table class="w-full min-w-[760px] border-collapse">

            <thead>

              <tr class="bg-surface-container-low">

                <th class="w-20 border-b border-hairline px-4 py-3 text-center text-body-sm font-semibold text-ink-black">
                  번호
                </th>

                <th class="w-28 border-b border-hairline px-4 py-3 text-center text-body-sm font-semibold text-ink-black">
                  분류
                </th>

                <th class="border-b border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">
                  제목
                </th>

                <th class="w-32 border-b border-hairline px-4 py-3 text-center text-body-sm font-semibold text-ink-black">
                  등록일
                </th>

                <th class="w-20 border-b border-hairline px-4 py-3 text-center text-body-sm font-semibold text-ink-black">
                  조회
                </th>

              </tr>

            </thead>

            <tbody>

              <c:choose>

                <c:when test="${empty noticeList}">

                  <tr>

                    <td colspan="5"
                        class="px-4 py-16 text-center text-body-md text-ink-secondary">
                      조건에 맞는 공지사항이 없습니다.
                    </td>

                  </tr>

                </c:when>

                <c:otherwise>

                  <c:forEach var="notice"
                             items="${noticeList}">

                    <tr class="transition-colors hover:bg-surface-container-low">

                      <td class="border-b border-hairline px-4 py-4 text-center text-body-sm text-ink-muted">
                        ${notice.noticeNo}
                      </td>

                      <td class="border-b border-hairline px-4 py-4 text-center">

                        <span class="inline-block border border-hairline px-2 py-1 text-eyebrow text-ink-secondary">

                          <c:out value="${notice.category}"
                                 default="공지" />

                        </span>

                      </td>

                      <td class="border-b border-hairline px-4 py-4">

                        <a class="text-body-md text-ink-black hover:text-primary"
                           href="${ctx}/patient/notice/detail?noticeNo=${notice.noticeNo}">

                          <c:out value="${notice.title}" />

                        </a>

                      </td>

                      <td class="border-b border-hairline px-4 py-4 text-center text-body-sm text-ink-muted">

                        <fmt:formatDate value="${notice.noticeDate}"
                                        pattern="yyyy.MM.dd" />

                      </td>

                      <td class="border-b border-hairline px-4 py-4 text-center text-body-sm text-ink-muted">
                        ${notice.views}
                      </td>

                    </tr>

                  </c:forEach>

                </c:otherwise>

              </c:choose>

            </tbody>

          </table>

        </div>

        <!-- 모바일 카드 -->
        <div class="divide-y divide-hairline md:hidden">

          <c:choose>

            <c:when test="${empty noticeList}">

              <div class="px-4 py-16 text-center text-body-md text-ink-secondary">
                조건에 맞는 공지사항이 없습니다.
              </div>

            </c:when>

            <c:otherwise>

              <c:forEach var="notice"
                         items="${noticeList}">

                <a class="block px-4 py-4 transition-colors hover:bg-surface-container-low"
                   href="${ctx}/patient/notice/detail?noticeNo=${notice.noticeNo}">

                  <div class="mb-2 flex flex-wrap items-center gap-2">

                    <span class="border border-hairline px-2 py-0.5 text-eyebrow text-ink-secondary">

                      <c:out value="${notice.category}"
                             default="공지" />

                    </span>

                    <span class="text-body-sm text-ink-muted">

                      <fmt:formatDate value="${notice.noticeDate}"
                                      pattern="yyyy.MM.dd" />

                    </span>

                  </div>

                  <p class="text-body-md text-ink-black">
                    <c:out value="${notice.title}" />
                  </p>

                </a>

              </c:forEach>

            </c:otherwise>

          </c:choose>

        </div>

      </section>

      <!-- 페이징 -->
      <c:if test="${totalPages > 1}">

        <nav class="mt-8 flex items-center justify-center gap-2"
             aria-label="공지사항 페이지 이동">

          <c:if test="${currentPage > 1}">

            <c:url var="prevUrl"
                   value="/patient/notice/list">

              <c:param name="currentPage"
                       value="${currentPage - 1}" />

              <c:if test="${not empty keyword}">
                <c:param name="keyword"
                         value="${keyword}" />
              </c:if>

              <c:if test="${not empty category}">
                <c:param name="category"
                         value="${category}" />
              </c:if>

            </c:url>

            <a class="border border-hairline bg-canvas-white px-3 py-2 text-body-sm text-ink-secondary transition-colors hover:border-primary hover:text-primary"
               href="${prevUrl}">
              이전
            </a>

          </c:if>

          <c:forEach var="pageNo"
                     begin="1"
                     end="${totalPages}">

            <c:url var="pageUrl"
                   value="/patient/notice/list">

              <c:param name="currentPage"
                       value="${pageNo}" />

              <c:if test="${not empty keyword}">
                <c:param name="keyword"
                         value="${keyword}" />
              </c:if>

              <c:if test="${not empty category}">
                <c:param name="category"
                         value="${category}" />
              </c:if>

            </c:url>

            <a class="border px-3 py-2 text-body-sm transition-colors
                      ${pageNo == currentPage
                        ? 'border-primary bg-primary text-white'
                        : 'border-hairline bg-canvas-white text-ink-secondary hover:border-primary hover:text-primary'}"
               href="${pageUrl}">
              ${pageNo}
            </a>

          </c:forEach>

          <c:if test="${currentPage < totalPages}">

            <c:url var="nextUrl"
                   value="/patient/notice/list">

              <c:param name="currentPage"
                       value="${currentPage + 1}" />

              <c:if test="${not empty keyword}">
                <c:param name="keyword"
                         value="${keyword}" />
              </c:if>

              <c:if test="${not empty category}">
                <c:param name="category"
                         value="${category}" />
              </c:if>

            </c:url>

            <a class="border border-hairline bg-canvas-white px-3 py-2 text-body-sm text-ink-secondary transition-colors hover:border-primary hover:text-primary"
               href="${nextUrl}">
              다음
            </a>

          </c:if>

        </nav>

      </c:if>

    </div>

  </main>

  <%@ include file="../common/footer.jsp" %>

</div>

<script src="${ctx}/patient/js/patient-portal.js"></script>

</body>
</html>