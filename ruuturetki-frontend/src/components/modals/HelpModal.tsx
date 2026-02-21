import { Modal } from "react-bootstrap";
import imgOverview from "../../../images/game_screen_info.png";
import imgTimer from "../../../images/timed_mode_timer.png";
import imgREM from "../../../images/round-end-view.png";

function HelpModal({
  show,
  handleCloseHelp,
}: {
  show: boolean;
  handleCloseHelp: () => void;
}) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseHelp}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>How to play?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>This is a simple game with 5 rounds</h4>
          <p>
            On each round you are shown an aerial image from a random location.
            Your task is to guess where that location is and click the location
            on the picker map.
          </p>
          <div className="toc">
            <h4>Table of contents</h4>
            <ul>
              <li>
                <a href="#overview">
                  Overview of the game screen and its controls
                </a>
              </li>
              <li>
                <a href="#score-calculation">Round score calculation</a>
              </li>
              <li>
                <a href="#REM-screen">Round end screen</a>
              </li>
              <li>
                <a href="#game-modes">Game modes</a>
              </li>
            </ul>
          </div>
          <div className="help-content">
            <h4 id="overview">Overview of the game screen and its controls</h4>
            <img
              src={imgOverview}
              alt="Screenshot of the game screen"
              title="Screenshot of the game screen"
            />
            <h5>Basic controls</h5>
            <p>
              You can move the aerial image by dragging it. Zooming in and out
              is disabled.
            </p>
            <h5>Picker map</h5>
            <p>
              Picker map is located at the bottom left corner of the screen. It
              is used to guess the location of the aerial image. The map will
              increase in size when hovered over. Click the picker map to select
              a location for your guess. A marker showing the your guess should
              appear. You can change your guess by clicking a new location on
              the picker map. The marker will move to the clicked location.
            </p>
            <h5>Control buttons</h5>
            <table className="control-button-explanations">
              <tbody>
                <tr>
                  <td>Reset map</td>
                  <td>
                    Returns your view to the starting location of the round, if
                    you have moved away from it.
                  </td>
                </tr>
                <tr>
                  <td>Select</td>
                  <td>Ends the round and shows you the round score.</td>
                </tr>
                <tr>
                  <td>Skip</td>
                  <td>
                    Continues to the next round without showing the round score.
                    The score for a skipped round will be 0.
                  </td>
                </tr>
                <tr>
                  <td>Exit</td>
                  <td>Ends the game and returns to main menu.</td>
                </tr>
              </tbody>
            </table>
            <h4 id="score-calculation">Round score calculation</h4>
            The maximum score per round is 10 000 which is decreased based on
            two distances.
            <ol>
              <li>
                The distance between your guess and the correct location and
              </li>
              <li>
                The distance you moved the aerial image away from the starting
                position
              </li>
            </ol>
            <p>
              Ideally you would select a guess within 10 meters of the correct
              location while not moving at all. This will give you a full score
              of 10 000 points for that round.
            </p>
            <h4 id="REM-screen">Round end screen</h4>
            <p>
              Score for the round is shown when the round is ended. Also an
              interactive map of your guess and the correct location is shown.
              Clicking Next continues to the next round.
              <img src={imgREM} alt="Round end screen" />
            </p>
            <h4 id="game-modes">Game modes</h4>
            <h5>No moving</h5>
            <p>
              Dragging the aerial image is disabled. You have to make your guess
              based on the initial view of the scene.
            </p>
            <h5>Timed mode</h5>
            <p>
              You have to make your guess before the timer reaches 0 seconds.
              The timer is located at the top of the screen. Select button is
              hidden in timed mode. You have to wait until the timer reaches 0
              for the round to end and to see your round score.
              <img
                className="timer-image"
                src={imgTimer}
                alt="Timer at the top of the screen"
              />
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default HelpModal;
