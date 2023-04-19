export const compose = (providers) => providers.reduce((Prev, Curr) => function ({ children }) {
    return (
        <Prev>
            <Curr>{children}</Curr>
        </Prev>
    );
});
