import { useLayoutEffect, useState } from 'react';

/**
 * Hook to determine if scroll content is intersecting with the
 * scroll box, and whether the intersection is happening on the top, bottom or both.
 * @param {*} dependency Dependency element - what will trigger a reevaluation.
 * @param {Node} target id or class of the scroll element
 * @return [Bool, Bool, func] topScrollShadow, bottomScrollShadow, callback tied to
 * an onScroll event, which the scroll element is passed: i.e. `(e) => handleScroll(e)`
 */
export default function useScrollIntersect(dependency, target) {
  const [topScrollShadow, setTopScrollShadow] = useState(false);
  const [bottomScrollShadow, setBottomScrollShadow] = useState(false);
  const [bottomScrollDifference, setBottomScrollDifference] = useState(0);
  let acquiredTarget;

  useLayoutEffect(() => {
    if (typeof target === 'string') {
      acquiredTarget = document.querySelector(target);
    } else {
      acquiredTarget = target;
    }

    if (acquiredTarget) {
      const scrollDiff = acquiredTarget.scrollHeight - acquiredTarget.clientHeight;
      setBottomScrollDifference(scrollDiff);
      if (scrollDiff > 0) {
        setBottomScrollShadow(true);
      } else {
        setBottomScrollShadow(false);
      }
    }
  }, [dependency, target]);

  function handleScroll(e) {
    const scrollOffset = e.target.scrollTop;
    function topBar() {
      if (scrollOffset > 0) {
        return !topScrollShadow && setTopScrollShadow(true);
      }
      return topScrollShadow && setTopScrollShadow(false);
    }
    function bottomBar() {
      if (bottomScrollDifference > 0) {
        if (bottomScrollDifference - scrollOffset === 0) {
          return bottomScrollShadow && setBottomScrollShadow(false);
        }
        return !bottomScrollShadow && setBottomScrollShadow(true);
      }
      return undefined;
    }
    topBar();
    bottomBar();
  }

  return [topScrollShadow, bottomScrollShadow, handleScroll];
}
