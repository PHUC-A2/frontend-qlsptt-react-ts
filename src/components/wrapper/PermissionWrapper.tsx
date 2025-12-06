// components/wrapper/PermissionWrapper.tsx
import type { ReactNode } from "react";
import Forbidden from "../../pages/error/Forbbiden";
import { usePermission } from "../../hooks/common/usePermission";

interface Props {
    required: string | string[];
    children: ReactNode;
}

/**
 * PermissionWrapper dùng để bao quanh component,
 * chỉ render nếu user có quyền.
 * Nếu không có quyền, hiển thị component Forbidden.
 */
const PermissionWrapper = ({ required, children }: Props) => {
    const can = usePermission(required);
    if (!can) return <Forbidden />;
    return <>{children}</>;
};

export default PermissionWrapper;
