export const getUIdsVIdsAndRecreateId = (options: { label: string; custom: string }[]) => {
    const U1 = options.find((o) => o.label === "U1")!.custom;
    const U2 = options.find((o) => o.label === "U2")!.custom;
    const U3 = options.find((o) => o.label === "U3")!.custom;
    const U4 = options.find((o) => o.label === "U4")!.custom;

    const V1 = options.find((o) => o.label === "V1")!.custom;
    const V2 = options.find((o) => o.label === "V2")!.custom;
    const V3 = options.find((o) => o.label === "V3")!.custom;
    const V4 = options.find((o) => o.label === "V4")!.custom;

    const recreateId = options.find((o) => o.label === "🔄")!.custom;

    return {
        UCustomIds: [U1, U2, U3, U4],
        VCustomIds: [V1, V2, V3, V4],
        recreateId,
    };
};
