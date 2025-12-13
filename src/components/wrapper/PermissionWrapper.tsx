import type { ReactNode } from "react";
import Forbidden from "../../pages/error/Forbbiden";
import { usePermission } from "../../hooks/common/usePermission";
import type { PermissionKey } from "../../utils/constants/permissions.constants";

interface Props {
    required: PermissionKey | PermissionKey[];
    children: ReactNode;
}

const PermissionWrapper = ({ required, children }: Props) => {
    const can = usePermission(required);
    if (!can) return <Forbidden />;
    return <>{children}</>;
};

export default PermissionWrapper;
