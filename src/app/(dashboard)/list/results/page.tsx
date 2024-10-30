import TableSearch from "@/components/TableSearch"
import Pagination from "@/components/Pagination"
import Image from "next/image"
import Table from "@/components/Table"
import Link from "next/link"
import { role, resultsData } from "@/lib/data"
import FormModal from "@/components/FormModal"

type Result = {
    id: number;
    subject: string;
    student: string;
    score: number;
    teacher: string;
    class: string;
    type: "exam" | "assignment";
    date: string;
}

const columns = [
    {
        header: "Subject", accessor: "name"
    },
    {
        header: "Student", accessor: "student"
    },
    {
        header: "Score", accessor: "score"
    },
    {
        header: "Teacher", accessor: "teacher", className: "hidden md:table-cell"
    },
    {
        header: "Class", accessor: "class", className: "hidden md:table-cell"
    },
    {
        header: "Date", accessor: "date", className: "hidden md:table-cell"
    },
    {
        header: "Type", accessor: "type", className: "hidden md:table-cell"
    },
    {
        header: "Actions", accessor: "action",
    },
]

const ResultListPage = () => {

    const renderRow = (item: Result) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
            <td className="flex items-center gap-4 p-4">
                <h3 className="font-semibold">{item.subject}</h3>
            </td>
            <td>{item.student}</td>
            <td>{item.score}</td>
            <td className="hidden md:table-cell">{item.teacher}</td>
            <td className="hidden md:table-cell">{item.class}</td>
            <td className="hidden md:table-cell">{item.date}</td>
            <td className="hidden md:table-cell">{item.type}</td>
            <td>
                <div className="flex items-center gap-2">
                    {role === "admin" && (
                        // <button title="delete" className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
                        //     <Image src="/delete.png" alt="" width={16} height={16} />
                        // </button>
                        <>
                            <FormModal table="result" type="update" data={item} />
                            <FormModal table="result" type="delete" id={item.id} />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button title="filter" className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button title="sort" className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button>
                        {role === "admin" && (
                            // <button title="add" className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            //     <Image src="/plus.png" alt="" width={14} height={14} />
                            // </button>
                            <FormModal table="result" type="create" />
                        )}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={resultsData} />
            {/* PAGINATION */}
            <Pagination />
        </div>
    )
}

export default ResultListPage;