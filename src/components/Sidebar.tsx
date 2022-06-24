import { gql, useQuery } from "@apollo/client";
import { Lesson } from "./Lesson";

const GET_LESSON_QUERY = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      slug
      title
      availableAt
      lessonType
    }
  }
`;

type GetLessonQueryResponse = {
  lessons: {
    id: string;
    slug: string;
    title: string;
    availableAt: string;
    lessonType: "live" | "class";
  }[];
};

export function Sidebar() {
  const { data } = useQuery<GetLessonQueryResponse>(GET_LESSON_QUERY);

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Vídeos
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map(({ title, slug, availableAt, id, lessonType }) => {
          return (
            <Lesson
              key={id}
              title={title}
              slug={slug}
              availableAt={new Date(availableAt)}
              type={lessonType}
            />
          );
        })}
      </div>
    </aside>
  );
}
