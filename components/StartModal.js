import React from "react"
import { Modal, Button } from "react-bootstrap"

function startModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            무비 Pick!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>평점이 높을 것 같은 영화를 선택하세요.</h4>
          <p>
            왼쪽 영화의 평점보다 오른 쪽 영화의 평점이 높다면 UP, 낮다면 DOWN 버튼을 눌러주세요.{<br/>}
            평점의 기준은 네이버 영화의 전문가 평점입니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>게임 시작</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export default startModal