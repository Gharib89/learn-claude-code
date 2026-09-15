/*
 * Retrieval-practice quiz. Shared across all lessons in this workspace.
 *
 * Markup contract:
 *
 *   <div class="quiz">
 *     <p class="quiz__lede">Recall</p>
 *     <p class="quiz__q" id="q1">Question text?</p>
 *     <ul class="quiz__opts" aria-labelledby="q1">
 *       <li><button class="quiz__opt" data-correct>Right answer here</button></li>
 *       <li><button class="quiz__opt">Wrong answer here</button></li>
 *     </ul>
 *     <div class="quiz__why" hidden>Why the right answer is right.</div>
 *   </div>
 *
 * One .quiz__why follows each .quiz__opts and is revealed on first answer.
 * Feedback is immediate and automatic: that tight loop is the whole point.
 *
 * Authoring rule the code cannot enforce, so enforce it yourself: every option
 * in a group must have the same word count and near-identical character count.
 * A learner who can spot the answer by its length has practised nothing.
 */
(function () {
  "use strict";

  function grade(group, chosen) {
    var opts = group.querySelectorAll(".quiz__opt");
    var right = chosen.hasAttribute("data-correct");

    opts.forEach(function (opt) {
      opt.disabled = true;
      if (opt === chosen) {
        opt.dataset.state = right ? "right" : "wrong";
      } else if (opt.hasAttribute("data-correct") && !right) {
        opt.dataset.state = "missed";
      }
      opt.setAttribute("aria-pressed", String(opt === chosen));
    });

    var why = group.nextElementSibling;
    if (why && why.classList.contains("quiz__why")) why.hidden = false;

    group.dataset.answered = right ? "right" : "wrong";
    announce(group, right ? "Correct." : "Not quite. The right answer is marked.");
  }

  function announce(group, message) {
    var live = group.parentNode.querySelector(".quiz__live");
    if (!live) {
      live = document.createElement("p");
      live.className = "quiz__live";
      live.setAttribute("role", "status");
      live.setAttribute("aria-live", "polite");
      live.style.position = "absolute";
      live.style.width = "1px";
      live.style.height = "1px";
      live.style.overflow = "hidden";
      live.style.clip = "rect(0 0 0 0)";
      live.style.whiteSpace = "nowrap";
      group.parentNode.appendChild(live);
    }
    live.textContent = message;
  }

  function reset(quiz) {
    quiz.querySelectorAll(".quiz__opt").forEach(function (opt) {
      opt.disabled = false;
      delete opt.dataset.state;
      opt.removeAttribute("aria-pressed");
    });
    quiz.querySelectorAll(".quiz__why").forEach(function (why) {
      why.hidden = true;
    });
    quiz.querySelectorAll(".quiz__opts").forEach(function (group) {
      delete group.dataset.answered;
    });
  }

  function init() {
    var quizzes = document.querySelectorAll(".quiz");
    if (!quizzes.length) return;

    quizzes.forEach(function (quiz) {
      quiz.addEventListener("click", function (event) {
        var opt = event.target.closest(".quiz__opt");
        if (!opt || opt.disabled) return;
        var group = opt.closest(".quiz__opts");
        if (group && !group.dataset.answered) grade(group, opt);
      });

      // Spacing the practice out is what builds storage strength, so make a
      // second pass cheap rather than requiring a reload.
      var again = document.createElement("button");
      again.type = "button";
      again.className = "quiz__reset";
      again.textContent = "Clear answers and try again later";
      again.addEventListener("click", function () {
        reset(quiz);
      });
      quiz.appendChild(again);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
