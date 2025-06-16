'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
  insertSiteSchema,
  insertSiteSchemaType,
  selectSiteSchemaType
} from '@/zod-schemas/site'
import { InputWithLabel } from '@/components/inputs/input-with-label'
import { TextAreaWithLabel } from '@/components/inputs/text-area-with-label'
import { CheckboxWithLabel } from '@/components/inputs/checkbox-with-label'
import { useAction } from 'next-safe-action/hooks'

import { toast } from 'sonner'
import { DisplayServerActionResponse } from '@/components/display-server-action-response'
import { LoaderCircle } from 'lucide-react'
import { saveSiteAction } from '@/modules/sites/actions/site-actions'

type Props = {
  site?: selectSiteSchemaType
  isManager?: boolean | undefined
}

export const SiteForm = ({ site }: Props) => {
  const { getPermission, isLoading } = useKindeBrowserClient()
  const isManager = !isLoading && getPermission('manager')?.isGranted

  const defaultValues: insertSiteSchemaType = {
    id: site?.id ?? 0,
    name: site?.name ?? '',
    description: site?.description ?? '',
    subdirectory: site?.subdirectory ?? '',
    active: site?.active ?? true
  }

  const form = useForm<insertSiteSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(insertSiteSchema),
    defaultValues
  })

  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSaveAction
  } = useAction(saveSiteAction, {
    onSuccess({ data }) {
      if (data?.message) {
        toast.success('Success! 🎉')
      }
    },
    onError() {
      toast.error('Edit failed')
    }
  })

  async function submitForm(data: insertSiteSchemaType) {
    executeSave(data)
  }
  return (
    <div className='bg-background w-full rounded-md'>
      <DisplayServerActionResponse result={saveResult} />
      <div className='mx-auto mt-24 flex max-w-[500px] flex-col rounded-md border-2 p-4'>
        <div className='mb-4'>
          <h2 className='text-primary text-2xl font-bold'>
            {site?.id ? 'Edit' : 'New'} Site {site?.id ? `#${site.id}` : 'Form'}
          </h2>
        </div>
        <Form {...form}>
          <form className='space-y-1' onSubmit={form.handleSubmit(submitForm)}>
            <InputWithLabel<insertSiteSchemaType>
              fieldTitle='Name'
              nameInSchema='name'
            />

            <TextAreaWithLabel<insertSiteSchemaType>
              fieldTitle='Description'
              nameInSchema='description'
            />

            <InputWithLabel<insertSiteSchemaType>
              fieldTitle='Sub Directory'
              nameInSchema='subdirectory'
            />

            {isLoading ? (
              <p>Loading...</p>
            ) : isManager && site?.id ? (
              <CheckboxWithLabel<insertSiteSchemaType>
                fieldTitle='Active'
                nameInSchema='active'
                message='Yes'
              />
            ) : null}

            {/* <Button type='submit'>Save</Button> */}
            <div className='mt-4 flex items-center justify-between space-x-4'>
              <Button
                type='submit'
                className='w-3/4'
                variant='default'
                title='Save'
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className='animate-spin' /> Saving
                  </>
                ) : (
                  'Save'
                )}
              </Button>
              <Button
                type='button'
                variant='destructive'
                title='Reset'
                onClick={() => {
                  form.reset(defaultValues)
                  resetSaveAction()
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
