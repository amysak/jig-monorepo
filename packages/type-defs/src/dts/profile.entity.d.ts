import { BaseEntity } from "typeorm";
export declare class Profile extends BaseEntity {
    id: number;
    type: string;
}
export declare class EdgeProfile extends Profile {
}
export declare class FrameProfile extends Profile {
}
export declare class PanelProfile extends Profile {
}
export declare class ProfileSet {
    edge?: EdgeProfile;
    frame?: FrameProfile;
    panel?: PanelProfile;
}
//# sourceMappingURL=profile.entity.d.ts.map