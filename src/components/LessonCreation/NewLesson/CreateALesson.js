import React, { useRef, useState, useEffect } from "react";
import {
  MinusCircleIcon as MCI,
  PencilIcon,
  SaveIcon,
  PlusSmIcon,
} from "@heroicons/react/outline";

export default function CreateALesson({
  lessonDetails,
  onclose,
  show = true,
  onSave,
}) {
  const [topics, setTopics] = useState(lessonDetails.topic);
  const [tabIndex, setTabIndex] = useState(0);
  const [currentOpenTab, setCurrentOpenTab] = useState();
  useEffect(() => {
    switch (tabIndex) {
      case 0:
        setCurrentOpenTab(<div>Quiz</div>);
        break;
      case 2:
        console.log(topics);
        setCurrentOpenTab(
          <TopicTab
            preTopic={lessonDetails.topic}
            onTopicUpdate={(g) => {
              setTopics([...g]);
            }}
          />
        );
        break;
      default:
        setCurrentOpenTab(<div>Quiz</div>);
    }
  }, [tabIndex, lessonDetails, topics]);

  const tabs = ["Quiz", "Questions", "Topic", "Note"];
  const handleTabItemChanged = (index) => {
    setTabIndex(index);
  };

  const handleMegaSave = () => {
    let updatedLessonDetails = lessonDetails;
    updatedLessonDetails.topic = topics;
    onSave(updatedLessonDetails);
  };
  return (
    <div
      className={`${
        show ? "fixed" : "hidden"
      } bg-coolGray-700 flex flex-col justify-between   overflow-y-auto shadow-xl scrollbar inset-4 lg:inset-28 rounded-md`}
    >
      <div>
        <div className={"sticky top-0 bg-coolGray-700 px-3 py-3 "}>
          <div className={"flex justify-between items-center "}>
            <div className={"text-xl"}>{lessonDetails?.subName}</div>
            <MCI
              onClick={(ev) => {
                onclose();
              }}
              className={"h-7 w-7"}
            />
          </div>
          <div></div>
          <div className={"mt-4 "}>
            <Tab children={tabs} onTabItemChanged={handleTabItemChanged} />
          </div>
          <div className={"mt-1 border-t-2 w-full bg-white"}></div>
        </div>
        <div className={"px-3 pb-3"}>{currentOpenTab && currentOpenTab}</div>
      </div>

      <button
        onClick={handleMegaSave}
        className={
          "outline-none flex flex-row gap-1 items-center h-10   font-medium text-sm  tracking-wider focus:outline-none  px-2.5   rounded-sm hover:bg-opacity-95 bg-teal-500 bg-opacity-80 text-warmGray-100"
        }
      >
        <SaveIcon className={"w-4 h-4"} />
        SAVE
      </button>
    </div>
  );
}

function Tab({
  align = "flex-row",
  onTabItemChanged,
  children = ["Quiz", "Question"],
}) {
  const [current, setcurrent] = useState(0);
  const handleTabChange = (index) => {
    setcurrent(index);
    onTabItemChanged(index);
  };
  return (
    <div>
      <div className={`flex ${align} gap-6 font-robotoCondensed`}>
        {children.map((tabItem, index) => (
          <div
            id={index}
            key={index}
            onClick={() => {
              handleTabChange(index);
            }}
            className={`cursor-pointer hover:underline ${
              index === current ? "text-orange-400" : "text-gray-300"
            }`}
          >
            {tabItem}
          </div>
        ))}
      </div>
    </div>
  );
}

function TopicTab({ preTopic, onTopicUpdate }) {
  const [preTopics, setPreTopics] = useState(preTopic);
  const handleAdd = () => {
    let blackTopic = {
      type: { typeText: "" },
      des: "",
    };
    setPreTopics([...preTopics, blackTopic]);
    onTopicUpdate(preTopics);
  };
  const hadleSaveAndUpdate = (index, ttype, tdes) => {
    let tempT = preTopics;
    tempT[index] = {
      type: { typeText: ttype },
      des: tdes,
    };
    setPreTopics([...tempT]);
    onTopicUpdate(preTopics);
  };
  return (
    <div className={"mt-4 flex flex-col gap-2  "}>
      {preTopics && (
        <div className={"flex flex-col gap-2"}>
          {preTopics.map((topic, index) => (
            <TopicCard
              key={index}
              topic={topic}
              onSave={(ttype, tdes) => hadleSaveAndUpdate(index, ttype, tdes)}
            />
          ))}{" "}
        </div>
      )}
      <div className={"flex  md:justify-end ml-3  md:mr-3"}>
        <button
          onClick={handleAdd}
          className={
            "outline-none flex flex-row gap-1 items-center h-10 w-20  font-medium text-sm  tracking-wider focus:outline-none  px-2.5   rounded-sm hover:bg-opacity-95 bg-red-500 bg-opacity-80 text-warmGray-100"
          }
        >
          <PlusSmIcon className={"w-4 h-4"} />
          ADD
        </button>
      </div>
    </div>
  );
}

function TopicCard({ topic, onSave }) {
  const [editMode, setEditMode] = useState(topic?.des ? false : true);
  const typeRef = useRef();
  const desRef = useRef();
  return (
    <div
      className={`flex flex-col  ${
        editMode ? "gap-2 " : "gap-0"
      }   md:flex-row w-full bg-coolGray-800 px-3 py-2 rounded-md`}
    >
      <div className={"flex  md:w-1/6 "}>
        {editMode ? (
          <input
            ref={typeRef}
            type="text"
            placeholder={"Type"}
            disabled={!editMode}
            defaultValue={topic?.type?.typeText.toUpperCase()}
            className={`uppercase rounded-sm border focus:outline-none bg-coolGray-800 px-2 h-10  w-full`}
          />
        ) : (
          <div className={`bg-transparent  mt-1.5 mb-1.5   w-full`}>
            {topic?.type?.typeText.toUpperCase()}
          </div>
        )}
      </div>
      <div className={"flex md:w-full "}>
        {editMode ? (
          <input
            ref={desRef}
            type="text"
            placeholder={"Description"}
            disabled={!editMode}
            defaultValue={topic?.des}
            className={`rounded-sm border focus:outline-none bg-coolGray-800 m-0 px-2 h-10   w-full`}
          />
        ) : (
          <div className={`bg-transparent mt-1 mb-1.5   w-full `}>
            {topic?.des}
          </div>
        )}
      </div>
      <div className={`${!editMode ? "mt-2" : ""} md:mt-0`}>
        {!editMode ? (
          <button
            onClick={() => {
              setEditMode(!editMode);
            }}
            className={
              "outline-none flex flex-row gap-1 items-center h-10 w-20  font-medium text-sm  tracking-wider focus:outline-none  px-2.5   rounded-sm hover:bg-opacity-95 bg-lightBlue-500 bg-opacity-80 text-warmGray-100"
            }
          >
            <PencilIcon className={"w-4 h-4"} />
            EDIT
          </button>
        ) : (
          <button
            onClick={() => {
              if (typeRef.current.value !== "" && desRef.current.value !== "") {
                setEditMode(!editMode);
                onSave(typeRef.current.value, desRef.current.value);
              }
            }}
            className={
              "outline-none flex flex-row gap-1 items-center h-10 w-20  font-medium text-sm  tracking-wider focus:outline-none  px-2.5   rounded-sm hover:bg-opacity-95 bg-teal-500 bg-opacity-80 text-warmGray-100"
            }
          >
            <SaveIcon className={"w-4 h-4"} />
            SAVE
          </button>
        )}
      </div>
    </div>
  );
}
