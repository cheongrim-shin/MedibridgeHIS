<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="ctx" value="${pageContext.request.contextPath}" />

<%--
  Spring Security 로그인 여부 확인

  로그인 전:
  - pageContext.request.userPrincipal 비어 있음

  로그인 후:
  - pageContext.request.userPrincipal 존재함
--%>
<c:set var="loginPrincipal"
       value="${pageContext.request.userPrincipal}" />

<header class="relative sticky top-0 z-50 w-full border-b border-hairline bg-secondary">

  <div class="mx-auto flex h-20 w-full max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">

    <div class="flex h-full items-center gap-8">

      <!-- 로고 -->
      <a class="flex shrink-0 items-center gap-2 font-title text-title font-bold leading-none text-primary-fixed"
         href="${ctx}/patient/main">

        <span class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-fixed text-on-primary-fixed">
          M
        </span>

        <span class="leading-none">
          MediBridge
        </span>
      </a>

      <!-- PC 메뉴 -->
      <nav class="hidden h-full md:flex">

        <!-- 진료예약 -->
        <div class="group relative flex h-full items-center">

          <a class="flex h-full items-center px-5 font-title text-title text-white transition-colors hover:text-primary-fixed"
             href="${ctx}/patient/reservation/form">
            진료예약
          </a>

          <div class="absolute left-0 top-full hidden min-w-56 border border-hairline bg-canvas-white shadow-lg group-hover:block">

            <a class="block px-5 py-3 text-ink-black hover:bg-surface-container-low"
               href="${ctx}/patient/reservation/form">
              인터넷 진료예약
            </a>

            <a class="block px-5 py-3 text-ink-black hover:bg-surface-container-low"
               href="${ctx}/patient/reservation/list">
              예약 확인 / 취소
            </a>

            <a class="block px-5 py-3 text-ink-black hover:bg-surface-container-low"
               href="${ctx}/patient/mypage?tab=history">
              진료이력 조회
            </a>

          </div>
        </div>

        <!-- 마이페이지 -->
        <div class="group relative flex h-full items-center">

          <a class="flex h-full items-center px-5 font-title text-title text-white transition-colors hover:text-primary-fixed"
             href="${ctx}/patient/mypage">
            마이페이지
          </a>

          <div class="absolute left-0 top-full hidden min-w-56 border border-hairline bg-canvas-white shadow-lg group-hover:block">

            <a class="block px-5 py-3 text-ink-black hover:bg-surface-container-low"
               href="${ctx}/patient/mypage">
              마이페이지 홈
            </a>

            <a class="block px-5 py-3 text-ink-black hover:bg-surface-container-low"
               href="${ctx}/patient/mypage?tab=history">
              진료이력
            </a>

            <a class="block px-5 py-3 text-ink-black hover:bg-surface-container-low"
               href="${ctx}/patient/mypage?tab=profile">
              회원정보
            </a>

          </div>
        </div>

        <!-- 고객센터 -->
        <div class="group relative flex h-full items-center">

          <a class="flex h-full items-center px-5 font-title text-title text-white transition-colors hover:text-primary-fixed"
             href="${ctx}/patient/faq/list">
            고객센터
          </a>

          <div class="absolute left-0 top-full hidden min-w-56 border border-hairline bg-canvas-white shadow-lg group-hover:block">

            <a class="block px-5 py-3 text-ink-black hover:bg-surface-container-low"
               href="${ctx}/patient/faq/list">
              자주 묻는 질문
            </a>

            <a class="block px-5 py-3 text-ink-black hover:bg-surface-container-low"
               href="${ctx}/patient/qna/list">
              문의 내역
            </a>

            <a class="block px-5 py-3 text-ink-black hover:bg-surface-container-low"
               href="${ctx}/patient/qna/form">
              문의하기
            </a>

            <a class="block px-5 py-3 text-ink-black hover:bg-surface-container-low"
               href="${ctx}/patient/notice/list">
              공지사항
            </a>

          </div>
        </div>

      </nav>
    </div>

    <!-- 우측 로그인 영역 -->
    <div class="flex items-center gap-4 text-on-primary">

      <c:choose>

        <%-- Spring Security 로그인 성공 상태 --%>
        <c:when test="${not empty loginPrincipal}">

          <a class="font-body-sm text-body-sm transition-colors hover:text-primary-fixed"
             href="${ctx}/patient/mypage">
            마이페이지
          </a>

          <%--
            Spring Security 로그아웃은 POST 방식으로 처리한다.
            CSRF가 활성화되어 있으면 CSRF 토큰을 함께 전송한다.
          --%>
          <form action="${ctx}/patient/logout"
                method="post"
                class="m-0 inline-flex">

            <c:if test="${not empty _csrf}">
              <input type="hidden"
                     name="${_csrf.parameterName}"
                     value="${_csrf.token}" />
            </c:if>

            <button type="submit"
                    class="border-0 bg-transparent p-0 font-body-sm text-body-sm text-on-primary transition-colors hover:text-primary-fixed">
              로그아웃
            </button>

          </form>

        </c:when>

        <%-- 로그인 전 상태 --%>
        <c:otherwise>

          <a class="font-body-sm text-body-sm transition-colors hover:text-primary-fixed"
             href="${ctx}/patient/signup">
            회원가입
          </a>

          <a class="font-body-sm text-body-sm transition-colors hover:text-primary-fixed"
             href="${ctx}/patient/login">
            로그인
          </a>

        </c:otherwise>

      </c:choose>

    </div>

  </div>
</header>