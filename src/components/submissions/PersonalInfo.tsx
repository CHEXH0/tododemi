import React from 'react';

interface PersonalInfoProps {
  age: string | null;
  country: string | null;
  languages: string | null;
  hobbies: string | null;
  dreams: string | null;
}

export const PersonalInfo = ({ age, country, languages, hobbies, dreams }: PersonalInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold mb-2">Personal Information</h3>
        <dl className="space-y-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Age</dt>
            <dd className="text-gray-900">{age}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Country</dt>
            <dd className="text-gray-900">{country}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Languages</dt>
            <dd className="text-gray-900">{languages}</dd>
          </div>
        </dl>
      </div>
      <div>
        <h3 className="font-semibold mb-2">About</h3>
        <dl className="space-y-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Hobbies</dt>
            <dd className="text-gray-900">{hobbies}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Dreams and Goals</dt>
            <dd className="text-gray-900">{dreams}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};