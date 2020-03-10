import React from "react"
import { Modal, Button } from "react-bootstrap"

function scoreTier(score) {
  if (score <= 3) {
    return ["브론즈", "다시해볼까요? 화이팅!"]
  } else if (score <= 6) {
    return ["실버", "조금 더 잘할 수 있어요!"]
  } else if (score <= 10) {
    return ["골드", "잘한 편이에요."]
  } else if (score <= 15) {
    return ["플래티넘", "대단한 점수입니다!"]
  } else if (score <= 20) {
    return ["다이아", "당신은 영잘알!"]
  }
}

function endModal(props) {
    const tier = scoreTier(props.score)
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{props.score} 점</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{tier[0]} 등급</h4>
        <p>
          {tier[1]}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>다시하기</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default endModal
