import React from 'react';

type SchemaProps = {
    schema: Record<string, any> | Record<string, any>[];
};

export default function SchemaMarkup({ schema }: SchemaProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
