import React from 'react';
import Avatar from '../atoms/Avatar';
import IconButton from '../atoms/IconButton';
import { FiEdit3, FiCamera } from 'react-icons/fi';

interface ProfileHeaderProps {
    avatarSrc?: string;
    userName: string;
    userEmail: string;
    onEditAvatar?: () => void;
    onEditProfile?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    avatarSrc,
    userName,
    userEmail,
    onEditAvatar,
    onEditProfile
}) => {
    return (
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
                <Avatar
                    src={avatarSrc}
                    alt={userName}
                    size="xl"
                    editable
                    onClick={onEditAvatar}
                />
                <div className="absolute -bottom-1 -right-1">
                    <IconButton onClick={onEditAvatar} variant="outline" size="sm">
                        <FiCamera className="w-3 h-3" />
                    </IconButton>
                </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-2 mb-1">
                    <h1 className="text-2xl font-bold text-white">{userName}</h1>
                    <IconButton onClick={onEditProfile} size="sm">
                        <FiEdit3 className="w-4 h-4" />
                    </IconButton>
                </div>
                <p className="text-zinc-400">{userEmail}</p>
            </div>
        </div>
    )
}

export default ProfileHeader