import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { 
  BookOpen, 
  Code, 
  TrendingUp, 
  Users, 
  Home as HomeIcon,
  Trophy,
  Settings,
  UserCog,
  LogOut,
  User
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const { user, logout, isAdmin, isTeacher } = useAuth();

  const navItems = [
    { path: "/", label: "Главная", icon: HomeIcon, roles: ['student', 'teacher', 'admin'] },
    { path: "/course", label: "Курс", icon: BookOpen, roles: ['student', 'teacher', 'admin'] },
    { path: "/practice", label: "Практика", icon: Code, roles: ['student', 'teacher', 'admin'] },
    { path: "/progress", label: "Прогресс", icon: TrendingUp, roles: ['student', 'teacher', 'admin'] },
    { path: "/classroom", label: "Класс", icon: Users, roles: ['student', 'teacher', 'admin'] },
    { path: "/admin", label: "Админ", icon: Settings, roles: ['admin'] },
    { path: "/classroom-management", label: "Управление", icon: UserCog, roles: ['teacher', 'admin'] },
  ].filter(item => !item.roles || item.roles.includes(user?.role));

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Go Academy</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center space-x-2 transition-all duration-200 ${
                      isActive 
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" 
                        : "hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {user?.profile?.totalXP || 0} XP
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="hidden sm:block text-sm">
                  <div className="font-medium text-gray-800">{user?.name}</div>
                  <div className="text-gray-500 text-xs capitalize">{user?.role}</div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center space-y-1 transition-all duration-200 ${
                    isActive 
                      ? "text-blue-600" 
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;