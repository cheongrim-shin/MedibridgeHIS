package ddit.common.controller;

import ddit.common.service.CommonCodeService;
import ddit.common.vo.CommonCodeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/commoncode")
public class CommonCodeController
{
    @Autowired
    CommonCodeService commonCodeService;

    public CommonCodeController(CommonCodeService commonCodeService)
    {
        this.commonCodeService = commonCodeService;
    }

    // GET /api/commoncode?group=M|C|U|P|Q|A|R...
    @GetMapping
    public ResponseEntity<List<CommonCodeVO>> readCommonCodeListByGroup(@RequestParam("group") String group)
    {
        return ResponseEntity.ok(commonCodeService.readCommonCodeListByGroup(group));
    }
}