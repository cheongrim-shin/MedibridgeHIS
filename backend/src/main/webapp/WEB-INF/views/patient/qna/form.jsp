<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8" />

  <meta name="viewport"
        content="width=device-width, initial-scale=1.0" />

  <title>문의하기 | MediBridge</title>

  <link rel="stylesheet"
        href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>

<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">

    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <!-- 페이지 제목 -->
      <header class="mb-8">

        <p class="font-eyebrow text-eyebrow text-primary">
          CUSTOMER CENTER
        </p>

        <h1 class="mt-2 font-headline-1 text-headline-1 font-bold md:text-display-1">
          문의하기
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          진료, 예약, 병원 이용과 관련된 문의를 남겨주시면
          담당자가 확인 후 답변드립니다.
        </p>

      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-3">

        <!-- 문의 등록 영역 -->
        <div class="space-y-gutter lg:col-span-2">

          <section class="border border-hairline bg-canvas-white">

            <!-- 상단 고객센터 메뉴 -->
            <div class="border-b border-hairline bg-surface-container-low p-4 md:p-6">

              <div class="flex flex-wrap gap-2">

                <a class="border border-hairline bg-canvas-white px-4 py-2 text-body-sm text-ink-black transition-colors hover:border-primary hover:text-primary"
                   href="${ctx}/patient/faq/list">
                  자주 묻는 질문
                </a>

                <a class="border border-hairline bg-canvas-white px-4 py-2 text-body-sm text-ink-black transition-colors hover:border-primary hover:text-primary"
                   href="${ctx}/patient/qna/list">
                  문의 내역
                </a>

                <a class="border border-primary bg-primary px-4 py-2 text-body-sm text-on-primary transition-colors"
                   href="${ctx}/patient/qna/form">
                  문의하기
                </a>

              </div>

            </div>

            <!-- 오류 메시지 -->
            <c:if test="${not empty errorMessage}">

              <div class="border-b border-hairline px-6 py-4 md:px-8"
                   style="background-color: #fff4f4;
                          color: #d32f2f;">

                <c:out value="${errorMessage}" />

              </div>

            </c:if>

            <%--
              Controller에서 전달한 qna 객체와 입력 필드를 연결한다.

              modelAttribute="qna"
              → Controller의 @ModelAttribute("qna")와 이름이 같아야 한다.
            --%>
            <form:form action="${ctx}/patient/qna/register"
                       method="post"
                       modelAttribute="qna"
                       cssClass="space-y-6 p-6 md:p-8">

              <!-- Spring Security CSRF 토큰 -->
              <c:if test="${not empty _csrf}">

                <input type="hidden"
                       name="${_csrf.parameterName}"
                       value="${_csrf.token}" />

              </c:if>

              <%--
                memberNumber, patientNumber, inquirer는 hidden으로 받지 않는다.

                문의 작성자 INQUIRER는 Controller에서
                로그인 사용자 정보를 기준으로 직접 설정한다.
              --%>

              <!-- 문의 분류 -->
              <div>

                <label for="categoryCode"
                       class="mb-2 block text-body-sm font-semibold text-ink-black">
                  문의 분류
                </label>

                <form:select path="categoryCode"
                             id="categoryCode"
                             required="required"
                             cssClass="w-full border border-hairline bg-canvas-white px-4 py-3 text-body-md text-ink-black outline-none focus:border-primary">

                  <form:option value=""
                               label="문의 분류를 선택하세요" />

                  <%--
                    COMMONCODE 테이블에서 조회한 Q01~Q09를 출력한다.

                    category.commonCodeNumber:
                    Q01, Q02, Q03 ... Q09

                    category.codeName:
                    진료 예약 문의, 진료/치료 관련 문의 등
                  --%>
                  <c:forEach var="category"
                             items="${qnaCategoryList}">

                    <form:option
                        value="${category.commonCodeNumber}"
                        label="${category.codeName}" />

                  </c:forEach>

                </form:select>

                <form:errors path="categoryCode"
                             cssClass="mt-2 block text-body-sm"
                             cssStyle="color: #d32f2f;" />

                <c:if test="${empty qnaCategoryList}">

                  <p class="mt-2 text-body-sm"
                     style="color: #d32f2f;">
                    문의 분류 정보를 불러오지 못했습니다.
                  </p>

                </c:if>

              </div>

              <!-- 제목 -->
              <div>

                <label for="subject"
                       class="mb-2 block text-body-sm font-semibold text-ink-black">
                  제목
                </label>

                <form:input path="subject"
                            id="subject"
                            maxlength="100"
                            required="required"
                            cssClass="w-full border border-hairline bg-canvas-white px-4 py-3 text-body-md text-ink-black outline-none focus:border-primary"
                            placeholder="문의 제목을 입력하세요." />

                <form:errors path="subject"
                             cssClass="mt-2 block text-body-sm"
                             cssStyle="color: #d32f2f;" />

              </div>

              <!-- 문의 내용 -->
              <div>

                <label for="inquiryDetails"
                       class="mb-2 block text-body-sm font-semibold text-ink-black">
                  문의 내용
                </label>

                <form:textarea path="inquiryDetails"
                               id="inquiryDetails"
                               required="required"
                               rows="10"
                               cssClass="w-full resize-none border border-hairline bg-canvas-white px-4 py-3 text-body-md text-ink-black outline-none focus:border-primary"
                               placeholder="문의 내용을 자세히 입력해 주세요." />

                <form:errors path="inquiryDetails"
                             cssClass="mt-2 block text-body-sm"
                             cssStyle="color: #d32f2f;" />

                <p class="mt-2 text-body-sm text-ink-secondary">
                  개인정보, 주민등록번호, 카드번호 등
                  민감한 정보는 입력하지 마세요.
                </p>

              </div>

              <!-- 문의 안내 -->
              <div class="border border-hairline bg-surface-container-low p-4">

                <p class="text-body-sm text-ink-secondary">
                  문의 등록 후 답변 상태는 문의 내역 화면에서
                  확인할 수 있습니다.
                </p>

              </div>

              <!-- 버튼 영역 -->
              <div class="flex flex-wrap justify-end gap-3 border-t border-hairline pt-6">

                <a href="${ctx}/patient/qna/list"
                   class="inline-flex items-center justify-center border border-hairline bg-canvas-white px-5 py-3 text-body-sm font-semibold text-ink-black hover:border-primary hover:text-primary">
                  취소
                </a>

                <button type="submit"
                        class="inline-flex items-center justify-center border border-primary bg-primary px-5 py-3 text-body-sm font-semibold text-on-primary hover:bg-tertiary">
                  문의 등록
                </button>

              </div>

            </form:form>

          </section>

        </div>

        <!-- 우측 고객센터 안내 -->
        <aside class="h-fit space-y-gutter lg:sticky lg:top-28">

          <div class="border border-hairline bg-canvas-white p-6 md:p-8">

            <h2 class="mb-4 font-headline-2 text-headline-2 text-ink-black">
              문의 안내
            </h2>

            <ul class="space-y-4 text-body-sm text-ink-secondary">

              <li class="flex gap-3">

                <span class="shrink-0 text-primary">
                  ✓
                </span>

                <div>

                  <p class="font-semibold text-ink-black">
                    답변 확인
                  </p>

                  <p class="mt-1">
                    등록한 문의는 문의 내역에서
                    답변 상태를 확인할 수 있습니다.
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

          <!-- 빠른 이동 -->
          <div class="divide-y divide-hairline border border-hairline bg-canvas-white">

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/faq/list">

              <span>자주 묻는 질문</span>
              <span class="text-primary">&gt;</span>

            </a>

            <a class="flex items-center justify-between px-4 py-3 text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
               href="${ctx}/patient/qna/list">

              <span>문의 내역</span>
              <span class="text-primary">&gt;</span>

            </a>

            <a class="flex items-center justify-between bg-surface-container-low px-4 py-3 text-body-md font-semibold text-primary transition-colors md:px-6 md:py-4"
               href="${ctx}/patient/qna/form">

              <span>문의하기</span>
              <span>&gt;</span>

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