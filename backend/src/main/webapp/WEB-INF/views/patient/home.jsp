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

  <title>MediBridge 환자포털</title>

  <link rel="stylesheet"
        href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>

<div class="flex min-h-screen flex-col bg-background text-ink-black">

<%@ include file="common/header.jsp" %>

  <main>

    <!-- 메인 히어로 -->
    <section class="relative overflow-hidden bg-surface-container-low">

      <div class="absolute inset-0 z-0">

        <img
          class="h-full w-full object-cover opacity-20"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi4NFcYD_kTBhqSptl3Ng7WrEJJPmJq6hnjyKwlIXjhZhH4dmOasIKyih_6-S20xpUIA7rcXoBcUM11KI3pMCpxQ8Ofckf0zQqj6G1xDLImCr0FcjzcoqUZZ_Os3KRNvuy7OhERSHXCIL0UTKP9g6ws4MTyywwq8f29gY5gUg-z3706-l2quxAHUGmh2Su1LYVbsfUFIZ__7vTEBLBZ8S2wUL6088OpW8MT_vAcJaFIn_qUQm4ZrUiWdqDoYX7jPXNIFD-mAD2w0Xh"
          alt="MediBridge 병원 이미지" />

      </div>

      <div class="relative z-10 mx-auto flex max-w-container-max flex-col items-center gap-4 px-margin-mobile py-14 text-center md:px-margin-desktop md:py-20">

        <p class="font-eyebrow text-eyebrow text-primary">
          MEDIBRIDGE PATIENT PORTAL
        </p>

        <h1 class="max-w-2xl font-display-1 text-display-1 leading-tight text-ink-black">
          환자 중심의 의료 혁신,<br />
          메디브릿지가 함께합니다
        </h1>

        <p class="max-w-xl text-body-md text-ink-secondary">
          진료예약, 예약조회, 진료이력, 고객센터를 환자포털에서 간편하게 이용하실 수 있습니다.
        </p>

        <div class="mt-4 flex flex-wrap justify-center gap-3">

          <a class="inline-flex items-center border border-primary bg-primary px-6 py-3 text-body-md text-on-primary transition-opacity hover:opacity-90"
             href="${ctx}/patient/reservation/form">
            진료 예약하기
          </a>

          <a class="inline-flex items-center border border-hairline bg-canvas-white px-6 py-3 text-body-md text-ink-black transition-colors hover:border-primary hover:text-primary"
             href="${ctx}/patient/mypage">
            마이페이지
          </a>

        </div>

      </div>

    </section>

    <!-- 주요 메뉴 -->
    <section class="relative z-20 mx-auto mt-8 max-w-container-max px-margin-mobile md:px-margin-desktop">

      <div class="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-gutter">

        <!-- 인터넷 진료예약 -->
        <a class="group flex flex-col items-center border border-hairline bg-canvas-white p-6 text-center text-ink-black shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary md:p-8"
           href="${ctx}/patient/reservation/form">

          <span class="mb-4 text-4xl text-primary transition-colors group-hover:text-on-primary">
            📅
          </span>

          <h3 class="mb-2 font-title text-title transition-colors group-hover:text-white">
            인터넷 진료예약
          </h3>

          <p class="hidden whitespace-pre-line text-body-sm text-ink-secondary transition-colors group-hover:text-primary-fixed-dim md:block">
            원하시는 시간에<br />
            빠르게 예약하세요
          </p>

        </a>

        <!-- 예약확인/취소 -->
        <a class="group flex flex-col items-center border border-hairline bg-canvas-white p-6 text-center text-ink-black shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary md:p-8"
           href="${ctx}/patient/reservation/list">

          <span class="mb-4 text-4xl text-primary transition-colors group-hover:text-on-primary">
            ✅
          </span>

          <h3 class="mb-2 font-title text-title transition-colors group-hover:text-white">
            예약확인/취소
          </h3>

          <p class="hidden whitespace-pre-line text-body-sm text-ink-secondary transition-colors group-hover:text-primary-fixed-dim md:block">
            나의 예약 내역을<br />
            확인하고 관리하세요
          </p>

        </a>

        <!-- 진료이력 -->
        <a class="group flex flex-col items-center border border-hairline bg-canvas-white p-6 text-center text-ink-black shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary md:p-8"
           href="${ctx}/patient/mypage?tab=history">

          <span class="mb-4 text-4xl text-primary transition-colors group-hover:text-on-primary">
            🩺
          </span>

          <h3 class="mb-2 font-title text-title transition-colors group-hover:text-white">
            진료이력
          </h3>

          <p class="hidden whitespace-pre-line text-body-sm text-ink-secondary transition-colors group-hover:text-primary-fixed-dim md:block">
            진료 기록과 접수 내역을<br />
            확인할 수 있습니다
          </p>

        </a>

        <!-- 고객센터 -->
        <a class="group flex flex-col items-center border border-hairline bg-canvas-white p-6 text-center text-ink-black shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary md:p-8"
           href="${ctx}/patient/faq/list">

          <span class="mb-4 text-4xl text-primary transition-colors group-hover:text-on-primary">
            💬
          </span>

          <h3 class="mb-2 font-title text-title transition-colors group-hover:text-white">
            고객센터
          </h3>

          <p class="hidden whitespace-pre-line text-body-sm text-ink-secondary transition-colors group-hover:text-primary-fixed-dim md:block">
            FAQ와 문의하기를<br />
            이용할 수 있습니다
          </p>

        </a>

      </div>

    </section>

    <!-- 공지사항 / 안내 영역 -->
    <section class="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile py-24 md:px-margin-desktop lg:grid-cols-3">

      <!-- 공지사항 -->
      <div class="col-span-1 flex flex-col border border-hairline bg-canvas-white">

        <div class="flex items-center justify-between border-b border-hairline bg-surface-container-low p-4">

          <h3 class="font-headline-2 text-headline-2 text-ink-black">
            공지사항
          </h3>

          <a class="flex items-center text-body-sm text-primary hover:underline"
             href="${ctx}/patient/notice/list">

            더보기

            <span class="ml-1 text-sm">
              &gt;
            </span>

          </a>

        </div>

        <div class="flex flex-col gap-0 p-4">

          <c:choose>

            <c:when test="${empty recentNoticeList}">

              <div class="px-2 py-8 text-center text-body-sm text-ink-secondary">
                등록된 공지사항이 없습니다.
              </div>

            </c:when>

            <c:otherwise>

              <c:forEach var="notice"
                         items="${recentNoticeList}"
                         begin="0"
                         end="4"
                         varStatus="status">

                <a class="group flex items-center justify-between px-2 py-3 transition-colors hover:bg-surface-container-low ${status.last ? '' : 'border-b border-surface-container'}"
                   href="${ctx}/patient/notice/detail?noticeNumber=${notice.noticeNumber}">

                  <span class="mr-4 truncate text-body-sm text-ink-black group-hover:text-primary">

                    <c:out value="${notice.noticeTitle}"
                           default="제목 없음" />

                  </span>

                  <span class="whitespace-nowrap text-body-sm text-ink-muted">

                    <c:choose>

                      <c:when test="${not empty notice.noticeDate}">

                        <fmt:formatDate
                          value="${notice.noticeDate}"
                          pattern="yyyy.MM.dd" />

                      </c:when>

                      <c:otherwise>
                        -
                      </c:otherwise>

                    </c:choose>

                  </span>

                </a>

              </c:forEach>

            </c:otherwise>

          </c:choose>

        </div>

      </div>

      <!-- 안내 카드 -->
      <div class="col-span-1 grid grid-cols-1 gap-gutter md:grid-cols-2 lg:col-span-2">

        <!-- 마이페이지 안내 -->
        <a class="group relative flex min-h-[240px] cursor-pointer overflow-hidden border border-hairline bg-ink-black"
           href="${ctx}/patient/mypage?tab=profile">

          <img
            class="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-40"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWqAgpYWIgRbcQa_ET-jlmC_OEOc3S85oMAfgdw6no-QwOC5I4SQotjedLOL9x7DU47ybSV-VnRwCnqzWbmh4el09QZLrVUHm3qsmaAUtfvq8aKxDOpgPRIqvhGrbMvu60klkCWzMAyuptfw0jGy7NkLjVob6SZiXPTTCfxC2tC2vL7iYBIYfvRvnM76geQ_H0AvomByhhpm3N2TqLVJ39AQtYANOevKJ0xM9SI3lG4GtgxthvIjrsKolExnZ6eJ-eIauWWHJ8QQpK"
            alt="환자 정보 안내" />

          <div class="relative z-10 flex h-full w-full flex-col p-6">

            <div>

              <span class="mb-4 inline-block w-max rounded bg-primary px-2 py-1 text-eyebrow text-white">
                MY PAGE
              </span>

              <h3 class="mb-2 font-headline-2 text-headline-2 text-white decoration-white underline-offset-4 group-hover:underline">
                내 정보와 진료이력을 한눈에 확인하세요
              </h3>

              <p class="text-body-sm text-surface-container-highest">
                회원정보, 진료이력, 예약현황을 마이페이지에서 확인할 수 있습니다.
              </p>

            </div>

          </div>

        </a>

        <!-- 문의하기 안내 -->
        <a class="group flex cursor-pointer flex-col justify-between border border-hairline bg-canvas-white p-6 transition-colors hover:border-primary"
           href="${ctx}/patient/qna/form">

          <div>

            <span class="mb-4 inline-block w-max rounded border border-primary px-2 py-1 text-eyebrow text-primary">
              CUSTOMER CENTER
            </span>

            <h3 class="mb-2 font-headline-2 text-headline-2 text-ink-black transition-colors group-hover:text-primary">
              궁금한 점은 문의하기를 이용해 주세요
            </h3>

            <p class="line-clamp-3 text-body-sm text-ink-secondary">
              진료예약, 수납, 증명서, 기타 문의를 남기면 담당자가 확인 후 답변합니다.
            </p>

          </div>

          <div class="mt-4 flex items-center gap-3">

            <div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-hairline bg-surface-container-high">

              <span class="text-2xl text-ink-muted">
                💬
              </span>

            </div>

            <div>

              <p class="font-title text-sm text-ink-black">
                고객센터
              </p>

              <p class="text-xs text-ink-muted">
                문의하기 / FAQ / 공지사항
              </p>

            </div>

          </div>

        </a>

      </div>

    </section>

  </main>

<%@ include file="common/footer.jsp" %>

</div>

</body>
</html>