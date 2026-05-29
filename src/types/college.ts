export type CourseLevel = "UG" | "PG" | "Diploma" | "PhD";
export type CollegeType = "Government" | "Private" | "Deemed" | "Autonomous";
export type Exam = "JEE Main" | "JEE Advanced" | "NEET" | "CAT" | "XAT" | "GATE" | "CLAT";

export interface Course {
  id: string;
  name: string;
  level: CourseLevel;
  duration: string;
  fees: number;
  seats: number;
  eligibility: string;
}

export interface PlacementStats {
  year: number;
  averagePackage: number;
  highestPackage: number;
  medianPackage: number;
  placementRate: number;
  topRecruiters: string[];
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  title: string;
  body: string;
  pros: string[];
  cons: string[];
  batch: number;
  course: string;
  createdAt: string;
  helpful: number;
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  heroImage: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  type: CollegeType;
  established: number;
  rating: number;
  reviewCount: number;
  ranking: {
    nirf?: number;
    qs?: number;
    india?: number;
  };
  fees: {
    min: number;
    max: number;
  };
  courses: Course[];
  placements: PlacementStats;
  reviews: Review[];
  accreditation: string[];
  highlights: string[];
  about: string;
  website: string;
  exams: Exam[];
  facilities: string[];
  totalStudents: number;
  campusSize: string;
}

export interface CollegeFilters {
  search: string;
  state: string;
  type: CollegeType | "";
  exam: Exam | "";
  courseLevel: CourseLevel | "";
  minFees: number;
  maxFees: number;
  minRating: number;
  sortBy: "rating" | "fees_asc" | "fees_desc" | "ranking" | "name";
}
