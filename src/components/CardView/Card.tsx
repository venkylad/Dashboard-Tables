import {
  Building2,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquareCode,
  Phone,
  ShieldUser,
  Users,
} from "lucide-react";
import type { Company } from "../../types/company";

function Card({ company }: { company: Company }) {
  return (
    <div
      key={company.id}
      className="flex flex-col overflow-hidden justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 hover:-translate-y-1 cursor-pointer"
    >
      <div className="mb-2 flex gap-3 items-center overflow-hidden">
        <img
          className="w-14 h-14 border-4 border-blue-300 rounded-full object-cover"
          src={company?.logo}
          alt={company?.name}
          title={company.ceo}
        />
        <div className="min-w-0">
          <h2 className="font-semibold text-lg text-gray-800 truncate">
            {company.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1 truncate">
            <Building2 size={14} className="text-gray-600" />
            <span className="truncate" title={company.industry}>
              {company.industry}
            </span>
            &nbsp;|&nbsp;
            <MapPin size={14} className="text-gray-600" />
            <span className="truncate" title={company.location}>
              {company.location}
            </span>
          </p>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-3">
        <p className="text-sm text-gray-500 mt-1 truncate flex items-center gap-1">
          <ShieldUser size={14} className="text-gray-600" />{" "}
          <label className="font-semibold">Founded</label>:{" "}
          <span className="truncate">{company.founded}</span>
          &nbsp;|&nbsp;
          <Users size={14} className="text-gray-600" />{" "}
          <label className="font-semibold">Employees</label>:{" "}
          <span className="truncate" title={company.employees?.toString()}>
            {company.employees}
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-1 truncate flex items-center gap-1">
          <Phone size={14} className="text-gray-600" />:{" "}
          <a
            href={`tel:${company.phone}`}
            className="truncate"
            title={company.phone}
          >
            {company.phone}
          </a>
          &nbsp;|&nbsp; <Mail size={14} className="text-gray-600" />:{" "}
          <a
            href={`mailto:${company.email}`}
            className="truncate"
            title={company.email}
          >
            {company.email}
          </a>
        </p>
        <p className="text-sm text-gray-600 mt-2 truncate flex items-center gap-1">
          <MessageSquareCode size={14} className="text-gray-600" />
          <label className="font-semibold">About</label>
        </p>
        <span
          className="text-sm text-gray-600 font-normal line-clamp-3"
          title={company.description}
        >
          {company.description}
        </span>
      </div>

      <a
        href={`https://${company.domain}`}
        target="_blank"
        rel="noreferrer"
        className=" text-blue-600 font-medium text-sm hover:underline mt-auto flex items-center gap-1"
      >
        Visit Website
        <ExternalLink className="text-blue-600" size={14} />
      </a>
    </div>
  );
}

export default Card;
