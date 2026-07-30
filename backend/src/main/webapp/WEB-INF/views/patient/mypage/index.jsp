<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>마이페이지 | MediBridge</title>

  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <!-- 페이지 제목 -->
      <header class="mb-8">
        <p class="font-eyebrow text-eyebrow text-primary">
          MY PAGE
        </p>

        <h1 class="mt-2 font-headline-1 text-headline-1 font-bold md:text-display-1">
          마이페이지
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          예약, 진료이력, 회원정보를 한곳에서 확인하고 관리할 수 있습니다.
        </p>
      </header>

      <div class="grid grid-cols-1 gap-gutter lg:grid-cols-[240px_minmax(0,1fr)]">

        <!-- 좌측 메뉴 -->
        <aside class="h-fit space-y-1 border border-hairline bg-canvas-white p-3 lg:sticky lg:top-28">

          <a class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors
             ${tab eq 'home' ? 'bg-primary text-on-primary' : 'text-ink-black hover:bg-surface-container-low'}"
             href="${ctx}/patient/mypage">
            <span class="font-body-md text-body-md">마이페이지</span>
          </a>

          <a class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors
             ${tab eq 'history' ? 'bg-primary text-on-primary' : 'text-ink-black hover:bg-surface-container-low'}"
             href="${ctx}/patient/mypage?tab=history">
            <span class="font-body-md text-body-md">진료이력</span>
          </a>

          <a class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors
             ${tab eq 'profile' ? 'bg-primary text-on-primary' : 'text-ink-black hover:bg-surface-container-low'}"
             href="${ctx}/patient/mypage?tab=profile">
            <span class="font-body-md text-body-md">회원정보</span>
          </a>

        </aside>

        <!-- 우측 내용 -->
        <section>

          <c:choose>

         <%-- 마이페이지 홈 --%>
            <c:when test="${tab eq 'home'}">

              <div class="space-y-gutter">

                <!-- 인사 카드 -->
                <div class="border border-hairline bg-canvas-white p-6 md:p-8">
                  <h2 class="font-headline-2 text-headline-2 text-ink-black">
                    <c:choose>
                      <c:when test="${not empty patientProfile}">
                        <c:out value="${patientProfile.patientName}" />님, 안녕하세요.
                      </c:when>
                      <c:otherwise>
                        환자님, 안녕하세요.
                      </c:otherwise>
                    </c:choose>
                  </h2>

                  <p class="mt-2 text-body-md text-ink-secondary">
                    예약 현황과 진료 정보를 확인하고 필요한 서비스를 바로 이용할 수 있습니다.
                  </p>
                </div>

                <!-- 다가오는 예약 -->
                <section>
                  <h3 class="mb-4 font-headline-2 text-headline-2 text-ink-black">
                    다가오는 예약
                  </h3>

                  <c:choose>
                    <c:when test="${empty upcomingReservation}">
                      <div class="border border-hairline bg-canvas-white p-6 text-center">
                        <p class="text-body-md text-ink-secondary">
                          예정된 예약이 없습니다.
                        </p>

                        <a class="mt-5 inline-flex items-center border border-primary bg-primary px-5 py-3 text-body-sm text-on-primary hover:bg-tertiary"
                           href="${ctx}/patient/reservation/form">
                          진료 예약하기
                        </a>
                      </div>
                    </c:when>

                    <c:otherwise>
                      <div class="flex flex-col gap-3 border border-hairline bg-canvas-white p-5 md:flex-row md:items-center md:justify-between">

                        <div>
                          <div class="mb-2 flex flex-wrap items-center gap-2">
                            <span class="inline-block bg-primary px-2 py-1 font-eyebrow text-eyebrow text-on-primary">
                              <c:out value="${upcomingReservation.reservationsStatus}" default="예약상태 미정" />
                            </span>

                            <span class="text-body-sm text-ink-muted">
                              예약번호
                              <c:out value="${upcomingReservation.reservationsNumber}" default="-" />
                            </span>
                          </div>

                          <p class="text-body-md font-semibold text-ink-black">
                            <c:choose>
                              <c:when test="${not empty upcomingReservation.reservedAt}">
                                <fmt:formatDate value="${upcomingReservation.reservedAt}" pattern="yyyy.MM.dd HH:mm" />
                              </c:when>
                              <c:otherwise>
                                예약일시 미정
                              </c:otherwise>
                            </c:choose>
                          </p>

                          <p class="mt-1 text-body-sm text-ink-secondary">
                            <c:choose>
                              <c:when test="${not empty upcomingReservation.deptName}">
                                <c:out value="${upcomingReservation.deptName}" />
                              </c:when>
                              <c:otherwise>
                                <c:out value="${upcomingReservation.deptCode}" default="진료과 미정" />
                              </c:otherwise>
                            </c:choose>

                            ·

                            <c:choose>
                              <c:when test="${not empty upcomingReservation.employeeName}">
                                <c:out value="${upcomingReservation.employeeName}" />
                              </c:when>
                              <c:otherwise>
                                <c:out value="${upcomingReservation.employeeCode}" default="의료진 미정" />
                              </c:otherwise>
                            </c:choose>
                          </p>
                        </div>

                        <a class="inline-flex items-center gap-1 text-body-sm text-primary hover:underline"
                           href="${ctx}/patient/reservation/detail?reservationsNumber=${upcomingReservation.reservationsNumber}">
                          상세보기 &gt;
                        </a>

                      </div>
                    </c:otherwise>
                  </c:choose>
                </section>

                <!-- 빠른 메뉴 -->
                <section>
                  <h3 class="mb-4 font-headline-2 text-headline-2 text-ink-black">
                    빠른 메뉴
                  </h3>

                  <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-gutter">

                    <a class="group flex flex-col border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary hover:bg-primary"
                       href="${ctx}/patient/reservation/form">
                      <span class="font-title text-title text-ink-black transition-colors group-hover:text-white">
                        인터넷 진료예약
                      </span>
                      <span class="mt-1 text-body-sm text-ink-secondary transition-colors group-hover:text-primary-fixed-dim">
                        새 진료 예약
                      </span>
                    </a>

                    <a class="group flex flex-col border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary hover:bg-primary"
                       href="${ctx}/patient/reservation/list">
                      <span class="font-title text-title text-ink-black transition-colors group-hover:text-white">
                        예약 확인·변경
                      </span>
                      <span class="mt-1 text-body-sm text-ink-secondary transition-colors group-hover:text-primary-fixed-dim">
                        예약 조회
                      </span>
                    </a>

                    <a class="group flex flex-col border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary hover:bg-primary"
                       href="${ctx}/patient/mypage?tab=history">
                      <span class="font-title text-title text-ink-black transition-colors group-hover:text-white">
                        진료이력
                      </span>
                      <span class="mt-1 text-body-sm text-ink-secondary transition-colors group-hover:text-primary-fixed-dim">
                        진료기록 확인
                      </span>
                    </a>

                    <a class="group flex flex-col border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary hover:bg-primary"
                       href="${ctx}/patient/faq/list">
                      <span class="font-title text-title text-ink-black transition-colors group-hover:text-white">
                        FAQ
                      </span>
                      <span class="mt-1 text-body-sm text-ink-secondary transition-colors group-hover:text-primary-fixed-dim">
                        자주 묻는 질문
                      </span>
                    </a>

                  </div>
                </section>

              </div>

            </c:when>

            <%-- 진료이력 --%>
            <c:when test="${tab eq 'history'}">

              <div class="space-y-gutter">

                <div class="border border-hairline bg-canvas-white p-6 md:p-8">
                  <h2 class="font-headline-2 text-headline-2 text-ink-black">
                    진료이력
                  </h2>

                  <p class="mt-2 text-body-md text-ink-secondary">
                    본원에서 받으신 진료 이력을 확인할 수 있습니다.
                  </p>
                </div>

                <!-- PC 진료이력 목록 -->
                <div class="hidden overflow-x-auto border border-hairline bg-canvas-white md:block">
                  <table class="w-full min-w-[760px] table-fixed border-collapse">
                    <colgroup>
                      <col class="w-[16%]" />
                      <col class="w-[18%]" />
                      <col class="w-[18%]" />
                      <col class="w-[14%]" />
                      <col class="w-[34%]" />
                    </colgroup>

                    <thead>
                      <tr class="bg-surface-container-low">
                        <th class="border-b border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">진료일</th>
                        <th class="border-b border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">진료과</th>
                        <th class="border-b border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">의료진</th>
                        <th class="border-b border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">구분</th>
                        <th class="border-b border-hairline px-4 py-3 text-left text-body-sm font-semibold text-ink-black">진료내용</th>
                      </tr>
                    </thead>

                    <tbody>
                      <c:choose>
                        <c:when test="${empty historyList}">
                          <tr>
                            <td colspan="5" class="px-4 py-16 text-center text-body-md text-ink-secondary">
                              조회된 진료이력이 없습니다.
                            </td>
                          </tr>
                        </c:when>

                        <c:otherwise>
                          <c:forEach var="history" items="${historyList}">
                            <tr class="hover:bg-surface-container-low">

                              <td class="border-b border-hairline px-4 py-4 text-body-sm text-ink-black">
                                <c:choose>
                                  <c:when test="${not empty history.treatmentDate}">
                                    <fmt:formatDate value="${history.treatmentDate}" pattern="yyyy.MM.dd" />
                                  </c:when>
                                  <c:when test="${not empty history.receiptDate}">
                                    <fmt:formatDate value="${history.receiptDate}" pattern="yyyy.MM.dd" />
                                  </c:when>
                                  <c:otherwise>
                                    -
                                  </c:otherwise>
                                </c:choose>
                              </td>

                              <td class="border-b border-hairline px-4 py-4 text-body-sm text-ink-black">
                                <c:choose>
                                  <c:when test="${not empty history.deptName}">
                                    <c:out value="${history.deptName}" />
                                  </c:when>
                                  <c:otherwise>
                                    <c:out value="${history.deptCode}" default="진료과 미정" />
                                  </c:otherwise>
                                </c:choose>
                              </td>

                              <td class="border-b border-hairline px-4 py-4 text-body-sm text-ink-black">
                                <c:choose>
                                  <c:when test="${not empty history.employeeName}">
                                    <c:out value="${history.employeeName}" />
                                  </c:when>
                                  <c:otherwise>
                                    <c:out value="${history.employeeCode}" default="의료진 미정" />
                                  </c:otherwise>
                                </c:choose>
                              </td>

                              <td class="border-b border-hairline px-4 py-4 text-body-sm text-ink-secondary">
                                <c:out value="${history.visitType}" default="외래" />
                              </td>

                              <td class="border-b border-hairline px-4 py-4 text-body-sm text-ink-secondary">
                                <c:choose>
                                  <c:when test="${not empty history.episodeName}">
                                    <c:out value="${history.episodeName}" />

                                    <c:if test="${not empty history.diseaseCode}">
                                      <span class="text-ink-muted">
                                        · 질병코드 <c:out value="${history.diseaseCode}" />
                                      </span>
                                    </c:if>
                                  </c:when>

                                  <c:otherwise>
                                    접수상태:
                                    <c:out value="${history.receiptStatus}" default="상태 미정" />
                                  </c:otherwise>
                                </c:choose>

                                <div class="mt-2">
                                  <a class="text-body-sm text-primary hover:underline"
                                     href="${ctx}/patient/mypage/history/detail?medicalNumber=${history.medicalNumber}">
                                    상세보기
                                  </a>
                                </div>
                              </td>

                            </tr>
                          </c:forEach>
                        </c:otherwise>
                      </c:choose>
                    </tbody>
                  </table>
                </div>

                <!-- 모바일 진료이력 목록 -->
                <div class="space-y-3 md:hidden">
                  <c:choose>
                    <c:when test="${empty historyList}">
                      <div class="border border-hairline bg-canvas-white p-8 text-center text-body-md text-ink-secondary">
                        조회된 진료이력이 없습니다.
                      </div>
                    </c:when>

                    <c:otherwise>
                      <c:forEach var="history" items="${historyList}">
                        <article class="border border-hairline bg-canvas-white p-5">

                          <div class="mb-2 flex items-center justify-between">
                            <span class="text-body-sm font-semibold text-ink-black">
                              <c:choose>
                                <c:when test="${not empty history.treatmentDate}">
                                  <fmt:formatDate value="${history.treatmentDate}" pattern="yyyy.MM.dd" />
                                </c:when>
                                <c:when test="${not empty history.receiptDate}">
                                  <fmt:formatDate value="${history.receiptDate}" pattern="yyyy.MM.dd" />
                                </c:when>
                                <c:otherwise>
                                  진료일 미정
                                </c:otherwise>
                              </c:choose>
                            </span>

                            <span class="bg-surface-container-high px-2 py-1 font-eyebrow text-eyebrow text-ink-secondary">
                              <c:out value="${history.visitType}" default="외래" />
                            </span>
                          </div>

                          <p class="text-body-sm text-ink-black">
                            <c:choose>
                              <c:when test="${not empty history.employeeName}">
                                <c:out value="${history.employeeName}" />
                              </c:when>
                              <c:otherwise>
                                <c:out value="${history.employeeCode}" default="의료진 미정" />
                              </c:otherwise>
                            </c:choose>

                            ·

                            <c:choose>
                              <c:when test="${not empty history.deptName}">
                                <c:out value="${history.deptName}" />
                              </c:when>
                              <c:otherwise>
                                <c:out value="${history.deptCode}" default="진료과 미정" />
                              </c:otherwise>
                            </c:choose>
                          </p>

                          <p class="mt-2 text-body-sm text-ink-secondary">
                            <c:choose>
                              <c:when test="${not empty history.episodeName}">
                                <c:out value="${history.episodeName}" />

                                <c:if test="${not empty history.diseaseCode}">
                                  · 질병코드 <c:out value="${history.diseaseCode}" />
                                </c:if>
                              </c:when>
                              <c:otherwise>
                                접수상태:
                                <c:out value="${history.receiptStatus}" default="상태 미정" />
                              </c:otherwise>
                            </c:choose>
                          </p>

                          <p class="mt-2 text-body-sm text-ink-muted">
                            진료번호:
                            <c:out value="${history.medicalNumber}" default="-" />
                          </p>

                          <div class="mt-3">
                            <a class="text-body-sm text-primary hover:underline"
                               href="${ctx}/patient/mypage/history/detail?medicalNumber=${history.medicalNumber}">
                              상세보기
                            </a>
                          </div>

                        </article>
                      </c:forEach>
                    </c:otherwise>
                  </c:choose>
                </div>

              </div>

            </c:when>

            <%-- 회원정보 --%>
            <c:when test="${tab eq 'profile'}">

              <div class="space-y-gutter">

                <div class="border border-hairline bg-canvas-white p-6 md:p-8">
                  <h2 class="font-headline-2 text-headline-2 text-ink-black">
                    회원정보
                  </h2>

                  <p class="mt-2 text-body-md text-ink-secondary">
                    회원 정보와 연락처를 확인할 수 있습니다.
                  </p>
                </div>

                <c:choose>

                  <c:when test="${empty patientProfile}">
                    <div class="border border-hairline bg-canvas-white p-8 text-center">
                      <h3 class="font-headline-2 text-headline-2 text-ink-black">
                        회원정보를 찾을 수 없습니다.
                      </h3>

                      <p class="mt-3 text-body-md text-ink-secondary">
                        요청하신 회원 정보가 없습니다.
                      </p>
                    </div>
                  </c:when>

                  <c:otherwise>
                    <div class="border border-hairline bg-canvas-white p-6 md:p-8">
                      <dl class="divide-y divide-hairline">

                        <div class="flex flex-col gap-1 py-4 first:pt-0 md:flex-row md:gap-4">
                          <dt class="w-full shrink-0 text-body-sm font-semibold text-ink-secondary md:w-36">이름</dt>
                          <dd class="text-body-md text-ink-black">
                            <c:out value="${patientProfile.patientName}" default="-" />
                          </dd>
                        </div>

                        <div class="flex flex-col gap-1 py-4 md:flex-row md:gap-4">
                          <dt class="w-full shrink-0 text-body-sm font-semibold text-ink-secondary md:w-36">회원번호</dt>
                          <dd class="text-body-md text-ink-black">
                            <c:out value="${patientProfile.patientNumber}" default="-" />
                          </dd>
                        </div>

                        <div class="flex flex-col gap-1 py-4 md:flex-row md:gap-4">
                          <dt class="w-full shrink-0 text-body-sm font-semibold text-ink-secondary md:w-36">생년월일</dt>
                          <dd class="text-body-md text-ink-black">
                            <c:out value="${patientProfile.birthDate}" default="-" />
                          </dd>
                        </div>

                        <div class="flex flex-col gap-1 py-4 md:flex-row md:gap-4">
                          <dt class="w-full shrink-0 text-body-sm font-semibold text-ink-secondary md:w-36">성별</dt>
                          <dd class="text-body-md text-ink-black">
                            <c:out value="${patientProfile.gender}" default="-" />
                          </dd>
                        </div>

                        <div class="flex flex-col gap-1 py-4 md:flex-row md:gap-4">
                          <dt class="w-full shrink-0 text-body-sm font-semibold text-ink-secondary md:w-36">휴대전화</dt>
                          <dd class="text-body-md text-ink-black">
                            <c:out value="${patientProfile.phone}" default="-" />
                          </dd>
                        </div>

                        <div class="flex flex-col gap-1 py-4 md:flex-row md:gap-4">
                          <dt class="w-full shrink-0 text-body-sm font-semibold text-ink-secondary md:w-36">주소</dt>
                          <dd class="text-body-md text-ink-black">
                            <c:out value="${patientProfile.address}" default="-" />
                          </dd>
                        </div>

                        <div class="flex flex-col gap-1 py-4 md:flex-row md:gap-4">
                          <dt class="w-full shrink-0 text-body-sm font-semibold text-ink-secondary md:w-36">우편번호</dt>
                          <dd class="text-body-md text-ink-black">
                            <c:out value="${patientProfile.zipcode}" default="-" />
                          </dd>
                        </div>

                        <div class="flex flex-col gap-1 py-4 last:pb-0 md:flex-row md:gap-4">
                          <dt class="w-full shrink-0 text-body-sm font-semibold text-ink-secondary md:w-36">계정 상태</dt>
                          <dd class="text-body-md text-ink-black">
                            <c:out value="${patientProfile.whetherToUse}" default="-" />
                          </dd>
                        </div>

                      </dl>

                      <hr class="my-6 border-0 border-t border-hairline" />

                      <div class="flex flex-wrap gap-3">
                        <a class="inline-flex items-center border border-primary bg-primary px-5 py-3 text-body-sm text-on-primary hover:bg-tertiary"
                           href="${ctx}/patient/mypage?tab=history">
                          진료이력 보기
                        </a>

                        <a class="inline-flex items-center border border-hairline bg-canvas-white px-5 py-3 text-body-sm text-ink-black hover:border-primary hover:text-primary"
                           href="${ctx}/patient/reservation/list">
                          예약 확인·변경
                        </a>
                      </div>

                    </div>
                  </c:otherwise>

                </c:choose>

              </div>

            </c:when>

          </c:choose>

        </section>

      </div>

    </div>
  </main>

  <jsp:include page="/WEB-INF/views/patient/common/footer.jsp" />

</div>

</body>
</html>