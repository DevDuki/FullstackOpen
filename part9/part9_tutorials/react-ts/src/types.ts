interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseWithDesc extends CoursePartBase {
  description?: string;
}

interface CourseNormalPart extends CoursePartBaseWithDesc {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBaseWithDesc {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseWithDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseWithDesc {
  type: 'special';
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

export const assertNever = (value: never):never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}