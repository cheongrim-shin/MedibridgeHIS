<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="ctx" value="${pageContext.request.contextPath}" />

<footer class="mt-auto border-t border-hairline bg-surface-container-low">
  <div class="mx-auto flex w-full max-w-container-max flex-col gap-4 px-margin-mobile py-12 md:flex-row md:items-center md:justify-between md:px-margin-desktop">

    <div class="font-body-sm text-body-sm text-ink-muted">
      <p>
        대전광역시 메디브릿지 병원 | 대표전화: 1588-1234 | 팩스: 042-123-4567
      </p>

      <p>
        © 2026 MediBridge HIS. All Rights Reserved.
      </p>
    </div>

    <div class="flex shrink-0 flex-wrap gap-4 font-body-sm text-body-sm">

      <a class="text-ink-muted underline hover:text-primary"
         href="${ctx}/patient/notice/list">
        공지사항
      </a>

      <a class="text-ink-muted underline hover:text-primary"
         href="${ctx}/patient/faq/list">
        FAQ
      </a>

      <a class="text-ink-muted underline hover:text-primary"
         href="${ctx}/patient/qna/form">
        문의하기
      </a>

      <a class="text-ink-muted underline hover:text-primary"
         href="${ctx}/patient/directions">
        찾아오시는길
      </a>

    </div>

  </div>
</footer>