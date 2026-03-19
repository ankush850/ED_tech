import type { ResumeProject } from "@/app/resume/lib/redux/types";
import type {
  FeatureSet,
  ResumeSectionToLines,
} from "@/app/resume/lib/parse-resume-from-pdf/types";
import { getSectionLinesByKeywords } from "@/app/resume/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/get-section-lines";
import {
  DATE_FEATURE_SETS,
  getHasText,
  isBold,
} from "@/app/resume/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";
import { divideSectionIntoSubsections } from "@/app/resume/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/subsections";
import { getTextWithHighestFeatureScore } from "@/app/resume/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/feature-scoring-system";
import {
  getBulletPointsFromLines,
  getDescriptionsLineIdx,
} from "@/app/resume/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/bullet-points";

export const extractProject = (sections: ResumeSectionToLines) => {
  const projects: ResumeProject[] = [];
  const projectsScores = [];
  const lines = getSectionLinesByKeywords(sections, ["project"]);
  const subsections = divideSectionIntoSubsections(lines);

  for (const subsectionLines of subsections) {
    const descriptionsLineIdx = getDescriptionsLineIdx(subsectionLines) ?? 1;

    const subsectionInfoTextItems = subsectionLines
      .slice(0, descriptionsLineIdx)
      .flat();
    const [date, dateScores] = getTextWithHighestFeatureScore(
      subsectionInfoTextItems,
      DATE_FEATURE_SETS
    );
    const PROJECT_FEATURE_SET: FeatureSet[] = [
      [isBold, 2],
      [getHasText(date), -4],
    ];
    const [project, projectScores] = getTextWithHighestFeatureScore(
      subsectionInfoTextItems,
      PROJECT_FEATURE_SET,
      false
    );

    const descriptionsLines = subsectionLines.slice(descriptionsLineIdx);
    const descriptions = getBulletPointsFromLines(descriptionsLines);

    projects.push({ project, date, descriptions });
    projectsScores.push({
      projectScores,
      dateScores,
    });
  }
  return { projects, projectsScores };
};
