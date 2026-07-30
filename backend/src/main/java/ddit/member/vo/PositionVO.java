package ddit.member.vo;

import lombok.Data;

@Data
public class PositionVO
{
    private String positionCode;            // POSITION_CODE - 직책코드
    private String positionName;            // POSITION_NAME - 직책명
    private String defaultPermissionName;   // DEFAULT_PERMISSION_NAME - 직책별 기본 권한
}