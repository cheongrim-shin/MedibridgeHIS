<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>예약 확인·변경 | MediBridge</title>
  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>

<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 py-12 md:py-16">
    <div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">

      <header class="mb-8">
        <p class="font-eyebrow text-eyebrow text-primary">
          MEDIBRIDGE APPOINTMENT
        </p>

        <h1 class="mt-2 font-headline-1 text-headline-1 font-bold md:text-display-1">
          예약 확인·변경
        </h1>

        <p class="mt-3 text-body-md text-ink-secondary">
          나의 예약 목록을 확인하고 상세 정보를 조회할 수 있습니다.
        </p>
      </header>

      <section class="space-y-gutter">

        <div class="border border-hairline bg-canvas-white p-6 md:p-8">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 class="font-headline-2 text-headline-2 text-ink-black">
                나의 예약 목록
              </h2>

              <p class="mt-2 text-body-md text-ink-secondary">
                예약일, 진료과, 의료진, 예약 상태를 확인할 수 있습니다.
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <a class="inline-flex items-center border border-primary bg-primary px-5 py-3 text-body-sm text-on-primary hover:bg-tertiary"
                 href="${ctx}/patient/reservation/form">
                새 진료 예약
              </a>

              <a class="inline-flex items-center border border-hairline bg-canvas-white px-5 py-3 text-body-sm text-ink-black hover:border-primary hover:text-primary"
                 href="${ctx}/patient/mypage">
                마이페이지
              </a>
            </div>

          </div>

          <c:if test="${not empty message}">
            <div class="mt-5 border border-hairline bg-surface-container-low px-4 py-3 text-body-sm text-primary">
              <c:out value="${message}" />
            </div>
          </c:if>

          <c:if test="${not empty successMessage}">
            <div class="mt-5 border border-hairline bg-surface-container-low px-4 py-3 text-body-sm text-primary">
              <c:out value="${successMessage}" />
            </div>
          </c:if>

          <c:if test="${not empty errorMessage}">
            <div class="mt-5 border border-hairline bg-surface-container-low px-4 py-3 text-body-sm text-ink-black">
              <c:out value="${errorMessage}" />
            </div>
          </c:if>
        </div>

        <div class="space-y-4">

          <c:choose>

            <c:when test="${empty reservationList}">
              <div class="border border-hairline bg-canvas-white p-10 text-center">

                <h2 class="font-headline-2 text-headline-2 text-ink-black">
                  조회된 예약 내역이 없습니다.
                </h2>

                <p class="mt-3 text-body-md text-ink-secondary">
                  진료 예약을 신청하면 이곳에서 예약 내역을 확인할 수 있습니다.
                </p>

                <div class="mt-6 flex justify-center gap-3">
                  <a class="inline-flex items-center border border-primary bg-primary px-5 py-3 text-body-sm text-on-primary hover:bg-tertiary"
                     href="${ctx}/patient/reservation/form">
                    진료 예약하기
                  </a>
                </div>

              </div>
            </c:when>

            <c:otherwise>

              <c:forEach var="reservation" items="${reservationList}">

                <c:set var="reservationNumberForLink"
                       value="${reservation.appointmentNumber}" />

                <c:if test="${empty reservationNumberForLink}">
                  <c:set var="reservationNumberForLink"
                         value="${reservation.reservationsNumber}" />
                </c:if>

                <c:set var="currentReservationStatus"
                       value="${reservation.reservationStatus}" />

                <c:if test="${empty currentReservationStatus}">
                  <c:set var="currentReservationStatus"
                         value="${reservation.reservationsStatus}" />
                </c:if>

                <article class="border border-hairline bg-canvas-white p-6 transition hover:border-primary md:p-7">

                  <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                    <div>
                      <div class="mb-3 flex flex-wrap items-center gap-2">

                        <c:choose>

                          <c:when test="${currentReservationStatus eq '예약'}">
                            <span class="inline-flex items-center border border-primary bg-primary px-3 py-1 font-eyebrow text-eyebrow text-on-primary">
                              예약 확정
                            </span>
                          </c:when>

                          <c:when test="${currentReservationStatus eq '예약신청'}">
                            <span class="inline-flex items-center border border-hairline bg-surface-container-high px-3 py-1 font-eyebrow text-eyebrow text-ink-black">
                              예약 신청
                            </span>
                          </c:when>

                          <c:when test="${currentReservationStatus eq '예약취소'}">
                            <span class="inline-flex items-center border border-hairline bg-surface-container-low px-3 py-1 font-eyebrow text-eyebrow text-ink-muted">
                              예약 취소
                            </span>
                          </c:when>

                          <c:when test="${currentReservationStatus eq '취소'}">
                            <span class="inline-flex items-center border border-hairline bg-surface-container-low px-3 py-1 font-eyebrow text-eyebrow text-ink-muted">
                              예약 취소
                            </span>
                          </c:when>

                          <c:otherwise>
                            <span class="inline-flex items-center border border-hairline bg-surface-container-high px-3 py-1 font-eyebrow text-eyebrow text-ink-secondary">
                              <c:out value="${currentReservationStatus}" default="상태 미정" />
                            </span>
                          </c:otherwise>

                        </c:choose>

                        <span class="font-eyebrow text-eyebrow text-ink-muted">
                          예약번호
                          <c:out value="${reservationNumberForLink}" default="-" />
                        </span>
                      </div>

                      <h2 class="font-headline-2 text-headline-2 text-ink-black">
                        <c:choose>
                          <c:when test="${not empty reservation.reservedAt}">
                            <fmt:formatDate value="${reservation.reservedAt}"
                                            pattern="yyyy.MM.dd (E) HH:mm" />
                          </c:when>

                          <c:otherwise>
                            예약일시 미정
                          </c:otherwise>
                        </c:choose>
                      </h2>

                      <p class="mt-2 text-body-md text-ink-secondary">

                        <c:choose>
                          <c:when test="${not empty reservation.deptName}">
                            <c:out value="${reservation.deptName}" />
                          </c:when>

                          <c:otherwise>
                            진료과 미정
                          </c:otherwise>
                        </c:choose>

                        ·

                        <c:choose>
                          <c:when test="${not empty reservation.employeeName}">
                            <c:out value="${reservation.employeeName}" />
                          </c:when>

                          <c:otherwise>
                            의료진 미정
                          </c:otherwise>
                        </c:choose>

                      </p>

                      <c:if test="${not empty reservation.symptoms}">
                        <p class="mt-3 text-body-sm text-ink-muted">
                          증상 메모:
                          <c:out value="${reservation.symptoms}" />
                        </p>
                      </c:if>
                    </div>

                    <div class="flex flex-wrap gap-3 md:justify-end">
                      <a class="inline-flex items-center border border-primary bg-primary px-5 py-3 text-body-sm text-on-primary hover:bg-tertiary"
                         href="${ctx}/patient/reservation/detail?appointmentNumber=${reservationNumberForLink}">
                        상세보기
                      </a>
                    </div>

                  </div>

                </article>

              </c:forEach>

            </c:otherwise>

          </c:choose>

        </div>

      </section>

    </div>
  </main>

  <jsp:include page="/WEB-INF/views/patient/common/footer.jsp" />

</div>

</body>
</html>