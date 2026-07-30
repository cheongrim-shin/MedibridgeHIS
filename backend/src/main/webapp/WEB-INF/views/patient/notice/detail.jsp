<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>
    <c:choose>
      <c:when test="${empty notice}">
        공지사항 상세 | MediBridge
      </c:when>
      <c:otherwise>
        ${notice.noticeTitle} | MediBridge
      </c:otherwise>
    </c:choose>
  </title>

  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <a class="mb-6 inline-flex items-center text-body-sm text-ink-secondary transition-colors hover:text-primary"
         href="${ctx}/patient/notice/list">
        ← 공지사항 목록
      </a>

      <c:choose>

        <c:when test="${empty notice}">
          <section class="border border-hairline bg-canvas-white px-6 py-16 text-center md:px-8">
            <h1 class="font-headline-1 text-headline-1 text-ink-black">
              공지사항을 찾을 수 없습니다.
            </h1>

            <p class="mt-4 text-body-md text-ink-secondary">
              요청하신 공지사항이 없거나 삭제된 공지사항입니다.
            </p>

            <div class="mt-8">
              <a class="inline-flex items-center border border-primary bg-primary px-6 py-3 text-body-md text-on-primary transition-opacity hover:opacity-90"
                 href="${ctx}/patient/notice/list">
                목록으로
              </a>
            </div>
          </section>
        </c:when>

        <c:otherwise>
          <article class="border border-hairline bg-canvas-white">

            <header class="border-b border-hairline px-6 py-8 md:px-8">

              <div class="mb-4 flex flex-wrap items-center gap-2">
                <span class="border border-hairline px-2 py-1 text-eyebrow text-ink-secondary">
                  <c:out value="${notice.noticeCategory}" default="공지" />
                </span>

                <c:if test="${not empty notice.noticeCode}">
                  <span class="border border-hairline px-2 py-1 text-eyebrow text-ink-secondary">
                    <c:out value="${notice.noticeCode}" />
                  </span>
                </c:if>
              </div>

              <h1 class="font-headline-1 text-headline-1 text-ink-black">
                <c:out value="${notice.noticeTitle}" />
              </h1>

              <div class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-body-sm text-ink-muted">
                <span>
                  등록일
                  <fmt:formatDate value="${notice.noticeDate}" pattern="yyyy.MM.dd" />
                </span>

                <span>
                  조회 ${notice.views}
                </span>
              </div>

            </header>

            <div class="notice-detail-content">
              <p class="whitespace-pre-line text-body-md text-ink-black">
                <c:out value="${notice.noticeContent}" />
              </p>
            </div>

          </article>

          <div class="notice-navigation">

            <div class="notice-navigation-row">
              <span class="notice-navigation-label">
                이전글
              </span>

              <div class="notice-navigation-content">
                <c:choose>
                  <c:when test="${empty prevNotice}">
                    <span class="notice-navigation-empty">
                      등록된 이전 공지가 없습니다.
                    </span>
                  </c:when>

                  <c:otherwise>
                    <a class="notice-navigation-link"
                       href="${ctx}/patient/notice/detail?noticeNumber=${prevNotice.noticeNumber}">
                      <c:out value="${prevNotice.noticeTitle}" />
                    </a>
                  </c:otherwise>
                </c:choose>
              </div>
            </div>

            <div class="notice-navigation-row">
              <span class="notice-navigation-label">
                다음글
              </span>

              <div class="notice-navigation-content">
                <c:choose>
                  <c:when test="${empty nextNotice}">
                    <span class="notice-navigation-empty">
                      등록된 다음 공지가 없습니다.
                    </span>
                  </c:when>

                  <c:otherwise>
                    <a class="notice-navigation-link"
                       href="${ctx}/patient/notice/detail?noticeNumber=${nextNotice.noticeNumber}">
                      <c:out value="${nextNotice.noticeTitle}" />
                    </a>
                  </c:otherwise>
                </c:choose>
              </div>
            </div>

          </div>

          <div class="mt-6 flex justify-center">
            <a class="inline-flex items-center border border-hairline bg-canvas-white px-6 py-3 text-body-md text-ink-black transition-colors hover:border-primary hover:text-primary"
               href="${ctx}/patient/notice/list">
              목록으로
            </a>
          </div>
        </c:otherwise>

      </c:choose>

    </div>
  </main>

  <jsp:include page="/WEB-INF/views/patient/common/footer.jsp" />

</div>
</body>
</html>