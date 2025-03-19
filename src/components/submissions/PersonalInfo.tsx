
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
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-lg backdrop-blur-sm">
        <h3 className="font-semibold mb-2 text-purple-600">Información Personal</h3>
        <dl className="space-y-2">
          <div className="hover:bg-white/50 p-2 rounded-lg transition-colors">
            <dt className="text-sm font-medium text-pink-500">Edad</dt>
            <dd className="text-gray-900">{age}</dd>
          </div>
          <div className="hover:bg-white/50 p-2 rounded-lg transition-colors">
            <dt className="text-sm font-medium text-pink-500">País</dt>
            <dd className="text-gray-900">{country}</dd>
          </div>
          <div className="hover:bg-white/50 p-2 rounded-lg transition-colors">
            <dt className="text-sm font-medium text-pink-500">Idiomas</dt>
            <dd className="text-gray-900">{languages}</dd>
          </div>
        </dl>
      </div>
      <div className="bg-gradient-to-bl from-purple-100 to-pink-100 p-4 rounded-lg backdrop-blur-sm">
        <h3 className="font-semibold mb-2 text-purple-600">Acerca de</h3>
        <dl className="space-y-2">
          <div className="hover:bg-white/50 p-2 rounded-lg transition-colors">
            <dt className="text-sm font-medium text-pink-500">Pasatiempos</dt>
            <dd className="text-gray-900">{hobbies}</dd>
          </div>
          <div className="hover:bg-white/50 p-2 rounded-lg transition-colors">
            <dt className="text-sm font-medium text-pink-500">Sueños y Metas</dt>
            <dd className="text-gray-900">{dreams}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
