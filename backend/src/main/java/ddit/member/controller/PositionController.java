package ddit.member.controller;

import ddit.member.service.PositionService;
import ddit.member.vo.PositionVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/positions")
@RequiredArgsConstructor
public class PositionController
{
    private final PositionService positionService;

    @GetMapping
    public ResponseEntity<List<PositionVO>> getAllPositions()
    {
        return ResponseEntity.ok(positionService.getAllPositions());
    }
}