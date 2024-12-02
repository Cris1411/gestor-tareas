import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { format, isAfter, isBefore, startOfWeek, endOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';

const Statistics = ({ darkMode }) => {
  const tasks = useSelector(state => state.tasks.tasks);

  const stats = useMemo(() => {
    const now = new Date();
    const weekStart = startOfWeek(now, { locale: es });
    const weekEnd = endOfWeek(now, { locale: es });

    return {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'done').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      pending: tasks.filter(t => t.status === 'todo').length,
      urgent: tasks.filter(t => t.priority === 'urgent').length,
      overdue: tasks.filter(t => {
        if (!t.dueDate || t.status === 'done') return false;
        return isBefore(new Date(t.dueDate), now);
      }).length,
      completedThisWeek: tasks.filter(t => 
        t.completedAt && 
        isAfter(new Date(t.completedAt), weekStart) && 
        isBefore(new Date(t.completedAt), weekEnd)
      ).length,
      byPriority: {
        urgent: tasks.filter(t => t.priority === 'urgent').length,
        high: tasks.filter(t => t.priority === 'high').length,
        normal: tasks.filter(t => t.priority === 'normal').length,
        low: tasks.filter(t => t.priority === 'low').length,
      }
    };
  }, [tasks]);

  const completionRate = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;
  const productivityRate = stats.total ? Math.round((stats.completedThisWeek / stats.total) * 100) : 0;

  const getRecentActivity = () => {
    return tasks
      .filter(task => task.status === 'done' && task.completedAt)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .slice(0, 5);
  };

  const renderProgressBar = (value, max, color) => (
    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-500 ease-in-out transform hover:opacity-80`}
        style={{ width: `${Math.round((value / max) * 100)}%` }}
      />
    </div>
  );

  const StatCard = ({ title, value, icon, color, bgColor }) => (
    <div className={`${bgColor} rounded-xl p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
      <div className="flex flex-col h-full">
        <div className={`p-2 rounded-lg ${darkMode ? 'bg-opacity-20' : 'bg-opacity-20'} ${color} self-start mb-2`}>
          {icon}
        </div>
        <div className="mt-2">
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : `${color}`}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl transition-all duration-300 hover:shadow-2xl`}>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Panel de Estadísticas</h2>
          <div className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            Tiempo Real
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50/50 p-4 rounded-lg">
            <div className="flex flex-col items-start">
              <div className="text-blue-600 mb-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-blue-600 text-sm font-medium">Total Tareas</span>
              <span className="text-4xl font-bold text-gray-800 mt-2">{stats.total}</span>
            </div>
          </div>

          <div className="bg-green-50/50 p-4 rounded-lg">
            <div className="flex flex-col items-start">
              <div className="text-green-600 mb-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-green-600 text-sm font-medium">Completadas</span>
              <span className="text-4xl font-bold text-gray-800 mt-2">{stats.completed}</span>
            </div>
          </div>

          <div className="bg-yellow-50/50 p-4 rounded-lg">
            <div className="flex flex-col items-start">
              <div className="text-yellow-600 mb-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-yellow-600 text-sm font-medium">En Progreso</span>
              <span className="text-4xl font-bold text-gray-800 mt-2">{stats.inProgress}</span>
            </div>
          </div>

          <div className="bg-red-50/50 p-4 rounded-lg">
            <div className="flex flex-col items-start">
              <div className="text-red-600 mb-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-red-600 text-sm font-medium">Vencidas</span>
              <span className="text-4xl font-bold text-gray-800 mt-2">{stats.overdue}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-600 rounded-lg p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="text-lg font-semibold">Rendimiento General</h3>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Última semana
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Tasa de Completado</span>
                <span className="text-lg font-bold">{completionRate}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <div className="mt-2 text-sm opacity-80">
                {stats.completed} de {stats.total} tareas completadas
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Productividad Semanal</span>
                <span className="text-lg font-bold">{productivityRate}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${productivityRate}%` }}
                />
              </div>
              <div className="mt-2 text-sm opacity-80">
                {stats.completedThisWeek} tareas esta semana
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className={`text-base md:text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Últimas Tareas Completadas
          </h3>
          <span className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Últimas 5 tareas
          </span>
        </div>
        <div className="space-y-3 md:space-y-4">
          {getRecentActivity().map(task => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3 md:p-4 rounded-xl transition-all duration-300 hover:shadow-md ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    {task.title}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {format(new Date(task.completedAt), "d 'de' MMMM, HH:mm", { locale: es })}
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}>
                {task.priority}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
