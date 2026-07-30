<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>회원가입 | MediBridge</title>
  <link rel="stylesheet" href="${ctx}/patient/css/patient-portal.css" />
</head>
<body>
<div class="flex min-h-screen flex-col bg-background text-ink-black">

  <jsp:include page="/WEB-INF/views/patient/common/header.jsp" />

  <main class="flex-1 px-margin-mobile py-12 md:px-margin-desktop">
    <div class="mx-auto w-full max-w-3xl border border-hairline bg-canvas-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] md:p-10">

      <header class="mb-8 border-b border-hairline pb-6">
        <h1 class="font-headline-1 text-headline-1 text-ink-black">
          환자 회원가입
        </h1>

        <p class="mt-3 text-body-sm leading-relaxed text-ink-secondary">
          카카오·PASS·토스·네이버 등의 인증수단으로 본인인증한 뒤
          병원에 등록된 환자정보에 로그인 계정을 연결합니다.
        </p>
      </header>

      <c:if test="${not empty signupError}">
        <div class="mb-6 border border-error bg-surface-container-low p-4">
          <p class="text-body-sm font-semibold text-error">
            <c:out value="${signupError}" />
          </p>
        </div>
      </c:if>

      <form id="signupForm"
            action="${ctx}/patient/signup"
            method="post"
            class="space-y-8">

        <c:if test="${not empty _csrf}">
          <input type="hidden"
                 name="${_csrf.parameterName}"
                 value="${_csrf.token}" />
        </c:if>

        <input id="identityVerificationId"
               name="identityVerificationId"
               type="hidden" />

        <section class="space-y-5">
          <h2 class="font-title text-title font-bold text-ink-black">
            1. 본인 정보 및 실제 본인인증
          </h2>

          <div>
            <label class="mb-2 block text-body-sm font-semibold text-ink-black"
                   for="memberName">
              이름
            </label>

            <input id="memberName"
                   name="memberName"
                   value="<c:out value='${signup.memberName}' />"
                   class="w-full border border-hairline bg-canvas-white px-4 py-3 text-body-md outline-none focus:border-primary"
                   placeholder="본인 이름을 입력하세요"
                   maxlength="50"
                   autocomplete="name"
                   type="text" />
          </div>

          <div>
            <label class="mb-2 block text-body-sm font-semibold text-ink-black"
                   for="memberPhoneNumber">
              휴대폰 번호
            </label>

            <input id="memberPhoneNumber"
                   name="memberPhoneNumber"
                   value="<c:out value='${signup.memberPhoneNumber}' />"
                   class="w-full border border-hairline bg-canvas-white px-4 py-3 text-body-md outline-none focus:border-primary"
                   placeholder="01012345678"
                   maxlength="13"
                   autocomplete="tel"
                   type="tel" />
          </div>

          <div>
            <label class="mb-2 block text-body-sm font-semibold text-ink-black">
              주민등록번호
            </label>

            <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <input id="rrnFront"
                     name="rrnFront"
                     value="<c:out value='${signup.rrnFront}' />"
                     class="w-full border border-hairline bg-canvas-white px-4 py-3 text-body-md outline-none focus:border-primary"
                     placeholder="앞 6자리"
                     maxlength="6"
                     inputmode="numeric"
                     type="text" />

              <span class="text-ink-secondary">-</span>

              <input id="rrnBack"
                     name="rrnBack"
                     value="<c:out value='${signup.rrnBack}' />"
                     class="w-full border border-hairline bg-canvas-white px-4 py-3 text-body-md outline-none focus:border-primary"
                     placeholder="뒤 7자리"
                     maxlength="7"
                     inputmode="numeric"
                     type="password" />
            </div>

      
          </div>

          <button id="identityVerificationButton"
                  type="button"
                  class="w-full border border-secondary bg-canvas-white px-5 py-4 text-button text-secondary hover:bg-surface-container-low">
            카카오·PASS 실제 본인인증
          </button>

          <div id="identityVerifiedPanel"
               class="hidden border border-primary bg-surface-container-low p-4">
            <p class="text-body-sm font-semibold text-primary">
              실제 본인인증이 완료되었습니다.
            </p>

            <p id="identityVerifiedSummary"
               class="mt-2 text-body-sm text-ink-secondary"></p>
          </div>

          <p id="identityVerificationMessage"
             class="text-body-sm text-ink-secondary">
            이름, 휴대폰 번호, 주민등록번호를 입력한 뒤 본인인증을 진행해 주세요.
          </p>
        </section>

        <section class="space-y-5 border-t border-hairline pt-8">
          <h2 class="font-title text-title font-bold text-ink-black">
            2. 로그인 정보
          </h2>

          <div>
            <label class="mb-2 block text-body-sm font-semibold text-ink-black"
                   for="memberId">
              아이디
            </label>

            <div class="flex flex-col gap-2 md:flex-row">
              <input id="memberId"
                     name="memberId"
                     value="<c:out value='${signup.memberId}' />"
                     class="min-w-0 flex-1 border border-hairline bg-canvas-white px-4 py-3 text-body-md outline-none focus:border-primary"
                     placeholder="영문, 숫자, 밑줄 4~20자"
                     maxlength="20"
                     autocomplete="username"
                     type="text" />

              <button id="checkMemberIdButton"
                      type="button"
                      class="shrink-0 border border-secondary bg-canvas-white px-5 py-3 text-button text-secondary hover:bg-surface-container-low">
                중복 확인
              </button>
            </div>

            <p id="memberIdMessage"
               class="mt-2 text-body-sm text-ink-secondary"></p>
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-body-sm font-semibold text-ink-black"
                     for="password">
                비밀번호
              </label>

              <input id="password"
                     name="password"
                     class="w-full border border-hairline bg-canvas-white px-4 py-3 text-body-md outline-none focus:border-primary"
                     placeholder="4자 이상"
                     minlength="4"
                     autocomplete="new-password"
                     type="password" />
            </div>

            <div>
              <label class="mb-2 block text-body-sm font-semibold text-ink-black"
                     for="passwordConfirm">
                비밀번호 확인
              </label>

              <input id="passwordConfirm"
                     name="passwordConfirm"
                     class="w-full border border-hairline bg-canvas-white px-4 py-3 text-body-md outline-none focus:border-primary"
                     placeholder="비밀번호 재입력"
                     minlength="4"
                     autocomplete="new-password"
                     type="password" />
            </div>
          </div>
        </section>

        <section class="space-y-5 border-t border-hairline pt-8">
          <h2 class="font-title text-title font-bold text-ink-black">
            3. 주소 정보
          </h2>

          <div class="grid gap-5 md:grid-cols-[260px_1fr]">
            <div>
              <label class="mb-2 block text-body-sm font-semibold text-ink-black"
                     for="postalCode">
                우편번호
              </label>

              <div class="flex gap-2">
                <input id="postalCode"
                       name="postalCode"
                       value="<c:out value='${signup.postalCode}' />"
                       class="min-w-0 flex-1 border border-hairline bg-surface-container-low px-4 py-3 text-body-md outline-none"
                       placeholder="우편번호"
                       maxlength="10"
                       autocomplete="postal-code"
                       readonly
                       type="text" />

                <button id="searchPostalCodeButton"
                        type="button"
                        class="shrink-0 border border-secondary bg-canvas-white px-4 py-3 text-button text-secondary hover:bg-surface-container-low">
                  찾기
                </button>
              </div>
            </div>

            <div>
              <label class="mb-2 block text-body-sm font-semibold text-ink-black"
                     for="primaryAddress">
                기본주소
              </label>

              <input id="primaryAddress"
                     name="primaryAddress"
                     value="<c:out value='${signup.primaryAddress}' />"
                     class="w-full border border-hairline bg-surface-container-low px-4 py-3 text-body-md outline-none"
                     placeholder="우편번호 찾기로 주소를 선택해 주세요"
                     maxlength="200"
                     autocomplete="street-address"
                     readonly
                     type="text" />
            </div>
          </div>

          <div>
            <label class="mb-2 block text-body-sm font-semibold text-ink-black"
                   for="detailedAddress">
              상세주소
            </label>

            <input id="detailedAddress"
                   name="detailedAddress"
                   value="<c:out value='${signup.detailedAddress}' />"
                   class="w-full border border-hairline bg-canvas-white px-4 py-3 text-body-md outline-none focus:border-primary"
                   placeholder="상세주소를 입력하세요"
                   maxlength="200"
                   type="text" />
          </div>
        </section>

        <p id="formErrorMessage"
           class="hidden border border-error bg-surface-container-low p-4 text-body-sm font-semibold text-error"></p>

        <div class="flex flex-col gap-3 border-t border-hairline pt-8 md:flex-row md:justify-end">
          <a href="${ctx}/patient/login"
             class="border border-hairline bg-canvas-white px-8 py-4 text-center text-button text-ink-black hover:bg-surface-container-low">
            로그인으로
          </a>

          <button type="submit"
                  class="bg-secondary px-8 py-4 text-button text-on-secondary hover:opacity-90">
            회원가입 완료
          </button>
        </div>
      </form>
    </div>
  </main>

  <jsp:include page="/WEB-INF/views/patient/common/footer.jsp" />
</div>

<script src="https://t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="https://cdn.portone.io/v2/browser-sdk.js"></script>

<script>
  const contextPath = '${ctx}';
  const csrfToken = '${_csrf.token}';
  const csrfHeader = '${_csrf.headerName}';

  const signupForm =
    document.getElementById('signupForm');

  const memberIdInput =
    document.getElementById('memberId');

  const memberNameInput =
    document.getElementById('memberName');

  const memberPhoneNumberInput =
    document.getElementById('memberPhoneNumber');

  const rrnFrontInput =
    document.getElementById('rrnFront');

  const rrnBackInput =
    document.getElementById('rrnBack');

  const memberIdMessage =
    document.getElementById('memberIdMessage');

  const identityVerificationMessage =
    document.getElementById(
      'identityVerificationMessage'
    );

  const identityVerificationButton =
    document.getElementById(
      'identityVerificationButton'
    );

  const identityVerificationIdInput =
    document.getElementById(
      'identityVerificationId'
    );

  const identityVerifiedPanel =
    document.getElementById(
      'identityVerifiedPanel'
    );

  const identityVerifiedSummary =
    document.getElementById(
      'identityVerifiedSummary'
    );

  const formErrorMessage =
    document.getElementById('formErrorMessage');

  const postalCodeInput =
    document.getElementById('postalCode');

  const primaryAddressInput =
    document.getElementById('primaryAddress');

  const detailedAddressInput =
    document.getElementById('detailedAddress');

  let memberIdCheckedValue = '';
  let identityVerified = false;

  function csrfHeaders(contentType) {
    const headers = {};

    if (contentType) {
      headers['Content-Type'] = contentType;
    }

    if (csrfToken && csrfHeader) {
      headers[csrfHeader] = csrfToken;
    }

    return headers;
  }

  async function parseResponse(response) {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || '요청 처리에 실패했습니다.'
      );
    }

    return data;
  }

  function normalizePhone(value) {
    return (value || '').replace(/[^0-9]/g, '');
  }

  function digits(value) {
    return (value || '').replace(/[^0-9]/g, '');
  }

  function showFormError(message) {
    formErrorMessage.textContent = message;
    formErrorMessage.classList.remove('hidden');
  }

  function clearFormError() {
    formErrorMessage.textContent = '';
    formErrorMessage.classList.add('hidden');
  }

  function getBirthData() {
    const front = digits(rrnFrontInput.value);
    const back = digits(rrnBackInput.value);

    if (!/^\d{6}$/.test(front)
        || !/^\d{7}$/.test(back)) {

      throw new Error(
        '주민등록번호 형식을 확인해 주세요.'
      );
    }

    const centuryCode = back.charAt(0);
    let century;

    if ('1256'.includes(centuryCode)) {
      century = '19';
    } else if ('3478'.includes(centuryCode)) {
      century = '20';
    } else if ('90'.includes(centuryCode)) {
      century = '18';
    } else {
      throw new Error(
        '주민등록번호 뒷자리 형식을 확인해 주세요.'
      );
    }

    return {
      birthYear: century + front.substring(0, 2),
      birthMonth: front.substring(2, 4),
      birthDay: front.substring(4, 6)
    };
  }

  function resetIdentityVerification(message) {
    identityVerified = false;
    identityVerificationIdInput.value = '';
    identityVerifiedPanel.classList.add('hidden');
    identityVerifiedSummary.textContent = '';

    identityVerificationButton.disabled = false;
    identityVerificationButton.textContent =
      '카카오·PASS 실제 본인인증';

    identityVerificationMessage.textContent =
      message
      || '이름, 휴대폰 번호, 주민등록번호를 입력한 뒤 본인인증을 진행해 주세요.';

    identityVerificationMessage.className =
      'text-body-sm text-ink-secondary';
  }

  identityVerificationButton.addEventListener(
    'click',
    async function () {

      clearFormError();

      const name =
        memberNameInput.value.trim();

      const phone =
        normalizePhone(
          memberPhoneNumberInput.value
        );

      if (!name) {
        showFormError('이름을 입력해 주세요.');
        memberNameInput.focus();
        return;
      }

      if (!/^01[0-9]\d{7,8}$/.test(phone)) {
        showFormError(
          '휴대폰 번호 형식을 확인해 주세요.'
        );
        memberPhoneNumberInput.focus();
        return;
      }

      let birth;

      try {
        birth = getBirthData();
      } catch (error) {
        showFormError(error.message);
        rrnFrontInput.focus();
        return;
      }

      if (!window.PortOne) {
        showFormError(
          'PortOne 본인인증 SDK를 불러오지 못했습니다.'
        );
        return;
      }

      try {
        identityVerificationButton.disabled = true;
        identityVerificationButton.textContent =
          '인증창 여는 중...';

        identityVerificationMessage.textContent =
          '본인인증창에서 인증수단을 선택해 주세요.';

        const prepareResponse = await fetch(
          contextPath
            + '/patient/signup/identity/prepare',
          {
            method: 'POST',
            headers: csrfHeaders()
          }
        );

        const prepared =
          await parseResponse(prepareResponse);

        const identityVerificationId =
          prepared.identityVerificationId;

        const response =
          await PortOne.requestIdentityVerification({
            storeId: prepared.storeId,
            identityVerificationId:
              identityVerificationId,
            channelKey: prepared.channelKey,

            customer: {
              fullName: name,
              phoneNumber: phone,
              birthYear: birth.birthYear,
              birthMonth: birth.birthMonth,
              birthDay: birth.birthDay
            },

            /*
             * KG이니시스 통합인증 설정.
             * 인증창에서 카카오, PASS, 토스, 네이버 등
             * 실제 인증수단을 선택할 수 있다.
             */
            bypass: {
              inicisUnified: {
                flgFixedUser: 'Y',
                FRGNDInfo: 'N'
              }
            }
          });

        if (!response) {
          throw new Error(
            '본인인증 결과를 받지 못했습니다.'
          );
        }

        if (response.code !== undefined) {
          throw new Error(
            response.message
              || '본인인증에 실패했습니다.'
          );
        }

        const completeResponse = await fetch(
          contextPath
            + '/patient/signup/identity/complete',
          {
            method: 'POST',
            headers: csrfHeaders(
              'application/json'
            ),
            body: JSON.stringify({
              identityVerificationId:
                identityVerificationId
            })
          }
        );

        const completed =
          await parseResponse(completeResponse);

        identityVerified = true;

        identityVerificationIdInput.value =
          completed.identityVerificationId;

        identityVerifiedSummary.textContent =
          completed.name
          + ' / '
          + completed.phoneNumber
          + ' / '
          + completed.birthDate;

        identityVerifiedPanel.classList.remove(
          'hidden'
        );

        identityVerificationMessage.textContent =
          completed.message;

        identityVerificationMessage.className =
          'text-body-sm font-semibold text-primary';

        identityVerificationButton.disabled = true;
        identityVerificationButton.textContent =
          '실제 본인인증 완료';

      } catch (error) {
        resetIdentityVerification(error.message);

        identityVerificationMessage.className =
          'text-body-sm text-error';
      }
    }
  );

  [
    memberNameInput,
    memberPhoneNumberInput,
    rrnFrontInput,
    rrnBackInput
  ].forEach(function (input) {
    input.addEventListener('input', function () {
      if (identityVerified) {
        resetIdentityVerification(
          '본인정보가 변경되어 실제 본인인증을 다시 진행해야 합니다.'
        );
      }
    });
  });

  document.getElementById(
    'checkMemberIdButton'
  ).addEventListener(
    'click',
    async function () {

      clearFormError();

      const memberId =
        memberIdInput.value.trim();

      if (!/^[A-Za-z0-9_]{4,20}$/.test(
        memberId
      )) {
        memberIdMessage.textContent =
          '아이디는 영문, 숫자, 밑줄 4~20자로 입력해 주세요.';

        memberIdMessage.className =
          'mt-2 text-body-sm text-error';

        memberIdCheckedValue = '';
        return;
      }

      try {
        const response = await fetch(
          contextPath
            + '/patient/signup/check-id?memberId='
            + encodeURIComponent(memberId)
        );

        const data = await parseResponse(response);

        memberIdMessage.textContent =
          data.message;

        memberIdMessage.className =
          data.available
            ? 'mt-2 text-body-sm text-primary'
            : 'mt-2 text-body-sm text-error';

        memberIdCheckedValue =
          data.available ? memberId : '';

      } catch (error) {
        memberIdMessage.textContent =
          error.message;

        memberIdMessage.className =
          'mt-2 text-body-sm text-error';

        memberIdCheckedValue = '';
      }
    }
  );

  memberIdInput.addEventListener(
    'input',
    function () {
      memberIdCheckedValue = '';

      memberIdMessage.textContent =
        '아이디 변경 후 중복 확인이 필요합니다.';

      memberIdMessage.className =
        'mt-2 text-body-sm text-ink-secondary';
    }
  );

  function openPostalCodeSearch() {
    clearFormError();

    if (!window.kakao || !kakao.Postcode) {
      showFormError(
        '우편번호 검색 서비스를 불러오지 못했습니다.'
      );
      return;
    }

    new kakao.Postcode({
      oncomplete: function (data) {
        let address = '';
        let extraAddress = '';

        if (data.userSelectedType === 'R') {
          address = data.roadAddress;

          if (
            data.bname
            && /[동로가]$/g.test(data.bname)
          ) {
            extraAddress += data.bname;
          }

          if (
            data.buildingName
            && data.apartment === 'Y'
          ) {
            extraAddress += extraAddress
              ? ', ' + data.buildingName
              : data.buildingName;
          }

          if (extraAddress) {
            address +=
              ' (' + extraAddress + ')';
          }
        } else {
          address = data.jibunAddress;
        }

        postalCodeInput.value =
          data.zonecode;

        primaryAddressInput.value =
          address;

        detailedAddressInput.value = '';
        detailedAddressInput.focus();
      }
    }).open({
      popupTitle:
        'MediBridge 우편번호 찾기'
    });
  }

  document.getElementById(
    'searchPostalCodeButton'
  ).addEventListener(
    'click',
    openPostalCodeSearch
  );

  signupForm.addEventListener(
    'submit',
    function (event) {

      clearFormError();

      if (
        !identityVerified
        || !identityVerificationIdInput.value
      ) {
        event.preventDefault();

        showFormError(
          '카카오·PASS 실제 본인인증을 완료해 주세요.'
        );
        return;
      }

      if (
        memberIdCheckedValue
        !== memberIdInput.value.trim()
      ) {
        event.preventDefault();

        showFormError(
          '아이디 중복 확인을 완료해 주세요.'
        );
        return;
      }

      const password =
        document.getElementById(
          'password'
        ).value;

      const passwordConfirm =
        document.getElementById(
          'passwordConfirm'
        ).value;

      if (password.length < 4) {
        event.preventDefault();

        showFormError(
          '비밀번호는 4자 이상이어야 합니다.'
        );
        return;
      }

      if (password !== passwordConfirm) {
        event.preventDefault();

        showFormError(
          '비밀번호 확인이 일치하지 않습니다.'
        );
        return;
      }

      if (
        !postalCodeInput.value.trim()
        || !primaryAddressInput.value.trim()
      ) {
        event.preventDefault();

        showFormError(
          '우편번호 찾기를 이용해 주소를 선택해 주세요.'
        );
        return;
      }

      if (!detailedAddressInput.value.trim()) {
        event.preventDefault();

        showFormError(
          '상세주소를 입력해 주세요.'
        );

        detailedAddressInput.focus();
      }
    }
  );
</script>
</body>
</html>
